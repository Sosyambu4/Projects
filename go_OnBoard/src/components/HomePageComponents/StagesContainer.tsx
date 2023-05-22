import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Link } from "react-router-dom";
import { useUser } from "../RequireAuth/context/AuthContext";
import { StagesBlocks, StagesDescription, StagesDetails } from "./StagesContainer.styled";

interface Stage {
  id: string;
  sort: number;
  icon: string;
  name: string;
}

//fetch stages collection from firebase//
export const StagesContainer = () => {
  const user = useUser();
  const [stagesName, setStagesName] = useState<Stage[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<{ [key: string]: boolean | null }>({ true: false });

  const getStagesName = async () => {
    const userCollerction = collection(database, "etaps");
    const querySnapshot = await getDocs(userCollerction);
    const stages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      icon: doc.data().icon,
      ...doc.data(),
    })) as Stage[];

    //fetch svg icons from firebase storage//
    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

    //using promise all to fetch all stages and svg icons before rendering whole page//
    const ImageUrls = (await Promise.all(
      stages.map(async (stage) => {
        const imageName = stage.icon;
        const imageRef = ref(storage, imageName);
        try {
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error(error);
        }
      })
    )) as string[];
    setStagesName(stages);
    setImageUrl(ImageUrls);
  };

  useEffect(() => {
    getStagesName();
  }, []);

  //stage sorting by "sort" key in firebase//
  const sortedStages = [...stagesName].sort((a, b) => a.sort - b.sort);
  //ganing access to id of stages in each activities and user_activities collections ( by used hook useFirebase) - needed to calculations the average of activities in each stages for log in user//

  interface Users {
    check_date: Timestamp;
    etap_id: string;
    user_id: String;
  }

  interface UsersActivities {
    comment: string;
    false: boolean;
    description: string;
    etap_id: string;
    id_course: string;
    link: string;
    name: string;
    set: number;
    sort: number;
    test: boolean;
    type: string;
  }

  const activity = useFirebaseFetch<UsersActivities>("activities");
  const userActivities = useFirebaseFetch<Users>("user_activities");
  const filteredUserActivities = userActivities.filter((activity) => activity.user_id === user?.uid);

  const counts = activity.reduce((acc: { [key: UsersActivities["etap_id"]]: number }, { etap_id }) => {
    //counting the number of occurrences of each stage/////
    if (!acc[etap_id]) {
      acc[etap_id] = 1;
    } else {
      acc[etap_id]++;
    }
    return acc;
  }, {});

  //User stage grouping to calculate average and stage last check date//
  const userActivitiesByEtapId = filteredUserActivities.reduce(
    (
      acc: {
        [key: UsersActivities["etap_id"]]: {
          count: number;
          check_date: Timestamp;
        };
      },
      activity
    ) => {
      const { etap_id, check_date } = activity;
      if (!acc[etap_id]) {
        acc[etap_id] = { count: 1, check_date };
      } else {
        acc[etap_id].count++;
        if (check_date > acc[etap_id]?.check_date) {
          acc[etap_id].check_date = check_date;
        }
      }
      return acc;
    },
    {}
  );

  //Calculation of the average for each step and the date of the last step check//
  const averagesAndDates = Object.entries(counts).map(([key, value]) => {
    const matchingValues = userActivitiesByEtapId[key];
    const sum = matchingValues ? matchingValues.count : 0;
    const average = (sum / value) * 100;
    const checkDate = matchingValues ? matchingValues.check_date : null;
    return { etap_id: key, average: average, checkDate };
  });

  const averagesByEtapId = averagesAndDates.reduce((acc: { [key: UsersActivities["etap_id"]]: number }, { etap_id, average }) => {
    acc[etap_id] = average;
    return acc;
  }, {});

  //blocking button clicks until user get 25% done activities
  const disabledMap = useMemo(() => {
    const map: { [key: string]: boolean } = {};
    let isFirst = true; // tracikng variable if first etap_id
    for (const { etap_id } of averagesAndDates) {
      if (isFirst && averagesByEtapId[etap_id] >= 0) {
        // set first etap_id on false, if it value in averagesByEtapId is 0 or more
        map[etap_id] = true;
        isFirst = false;
        continue;
      }
      map[etap_id] = averagesByEtapId[etap_id] >= 25; // sets disabledMap for next etap_id
    }
    return map;
  }, [averagesAndDates, averagesByEtapId]);

  //////////////////////////////////////////////////

  const checkDatesByEtapId = averagesAndDates.reduce((acc: { [key: UsersActivities["etap_id"]]: string }, { etap_id, checkDate }) => {
    if (checkDate && checkDate) {
      acc[etap_id] = checkDate.toDate().toLocaleDateString();
    } else {
      acc[etap_id] = "nie rozpoczęto";
    }
    return acc;
  }, {});

  return (
    <>
      <StagesBlocks>
        <StagesDescription>
          <span style={{ width: "30px" }}></span>
          <span style={{ color: "#020246", width: "90px", textAlign: "center" }}>Dział</span>
          <span style={{ color: "#020246", width: "90px", textAlign: "center" }}>Realizacja</span>
          <span style={{ color: "#020246", width: "90px", textAlign: "center" }}>Wykonano</span>
        </StagesDescription>
        {sortedStages.map(({ id, icon, name }) => {
          const imageUrlForStage = imageUrl[stagesName.findIndex((stage) => stage.id === id)];
          return (
            <Link
              key={id}
              className="etaps"
              to={disabledMap[id] ? `/etaps/${id}` : "#"}
              style={{
                pointerEvents: disabledMap[id] ? "auto" : "auto",
                backgroundColor: disabledMap[id] ? "white" : "rgba(10, 10, 10, 0.575)",
                cursor: disabledMap[id] ? "pointer" : "not-allowed",
              }}>
              <img
                src={imageUrlForStage}
                alt={icon}
                style={{
                  filter: disabledMap[id]
                    ? "brightness(0) saturate(100%) invert(9%) sepia(34%) saturate(5579%) hue-rotate(234deg) brightness(90%) contrast(121%)"
                    : "brightness(0) saturate(100%) invert(97%) sepia(97%) saturate(0%) hue-rotate(46deg) brightness(102%) contrast(105%)",
                }}
              />
              <StagesDetails style={{ color: disabledMap[id] ? "#020246" : "white" }}>{name}</StagesDetails>
              <StagesDetails style={{ color: disabledMap[id] ? "#020246" : "white" }}>{averagesByEtapId[id]}%</StagesDetails>
              <StagesDetails style={{ color: disabledMap[id] ? "#020246" : "white" }}>{checkDatesByEtapId[id]}</StagesDetails>
            </Link>
          );
        })}
      </StagesBlocks>
    </>
  );
};
