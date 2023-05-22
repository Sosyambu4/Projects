import "../../index.css";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Timestamp } from "firebase/firestore";
import { FieldValue } from "firebase/firestore";
import Account from "../RequireAuth/Account";
import { CalendarBlock, CourseDetails, UserInfo, UserInfoClock, UserInfoImgGift, UserInfoResult } from "./Calendar.styled";
import giftImgUrl from "../../assets/pliki-svg-dashboard/prezent.svg";
import clockImgUrl from "../../assets/pliki-svg-dashboard/zegarek.svg";
import resultImgUrl from "../../assets/pliki-svg-dashboard/Najlepszy wynik.svg";

interface IUser {
  uid: string;
  start_course: Timestamp | FieldValue;
}

interface IUserActivity {
  user_id: string;
  check_date: Timestamp;
}

// Type guard function
function isTimestamp(value: Timestamp | FieldValue): value is Timestamp {
  return value instanceof Timestamp;
}

// Helper function to check if the date is unique in an array
function isUniqueDate(date: Date, index: number, self: Date[]) {
  const dateString = date.toISOString();
  return self.findIndex((d) => d.toISOString() === dateString) === index;
}

function Calendar() {
  const userName = useUser();
  const usersCollection = useFirebaseFetch<IUser>("users");
  const userActivitiesCollection = useFirebaseFetch<IUserActivity>("user_activities");

  const currentUser = usersCollection?.find((user) => user.uid === userName?.uid);

  const now = new Date();
  let daysUntilStart: string | number = "Nieznany";

  //calculate days to start course
  if (currentUser?.start_course && isTimestamp(currentUser.start_course)) {
    const start_course_date = currentUser.start_course.toDate(); //change to object
    const timeDifference = start_course_date.getTime() - now.getTime(); //calculate in miliseconds
    daysUntilStart = Math.ceil(timeDifference / (1000 * 3600 * 24)); //change miliseconds->days and round up
  }

  // Calculate consecutive activities
  let consecutiveActivities = 0;
  let bestStreak = 0;

  // Check if the current date is in sortedUserActivities
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currentDayInActivities = false;

  if (userName) {
    const sortedUserActivities = userActivitiesCollection
      ?.filter((activity) => activity.user_id === userName.uid) //filter activity by user_id
      .map((activity) => {
        const date = activity.check_date.toDate();
        date.setHours(0, 0, 0, 0); //delete information about hour, minute etc.
        return date;
      })
      .filter(isUniqueDate) //filter date by unique, if user make few activity one day, take only one date
      .sort((a, b) => a.getTime() - b.getTime());

    //check that currentdate is in array-sortedUserActivities
    currentDayInActivities = sortedUserActivities?.some((activityDate) => activityDate.getTime() === today.getTime()) ?? false;

    let previousDate: Date | null = null;
    let currentStreak = 0;

    for (const activityDate of sortedUserActivities || []) {
      if (previousDate) {
        const dayDifference = (activityDate.getTime() - previousDate.getTime()) / (1000 * 3600 * 24); //days between current date and previous date

        if (dayDifference === 1) {
          currentStreak++;
        } else {
          bestStreak = Math.max(bestStreak, currentStreak);
          currentStreak = 1; //rest to 1 if activity isn't next day
        }
      } else {
        currentStreak = 1;
      }

      previousDate = activityDate; //to make another loop assign previousDate to activityDate
    }

    bestStreak = Math.max(bestStreak, currentStreak); //compares which is greater

    if (currentDayInActivities) {
      consecutiveActivities = currentStreak;
    } else {
      consecutiveActivities = 0;
    }
  }

  return (
    <CalendarBlock>
      <Account />
      <CourseDetails>
        <UserInfo>
          <UserInfoImgGift src={giftImgUrl} alt="prezent" />{" "}
          {daysUntilStart === 0 ? (
            "Kurs się rozpoczął"
          ) : (
            <>
              Kurs rozpocznie się za:{" "}
              <span style={{ fontWeight: "bold" }}>
                &nbsp;{daysUntilStart} {daysUntilStart === 1 ? "dzień" : "dni"}!
              </span>
            </>
          )}
        </UserInfo>
        <UserInfo>
          <UserInfoResult src={resultImgUrl} alt="najlepszy-wynik" />
          Dni pracy pod rząd:
          <span style={{ fontWeight: "bold" }}>&nbsp; {consecutiveActivities}</span>
        </UserInfo>
        <UserInfo>
          <UserInfoClock src={clockImgUrl} alt="zegarek" />
          Najlepszy wynik: <span style={{ fontWeight: "bold" }}>&nbsp; {bestStreak}</span>
        </UserInfo>
      </CourseDetails>
    </CalendarBlock>
  );
}

export default Calendar;
