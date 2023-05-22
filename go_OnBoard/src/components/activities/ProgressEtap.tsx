import React, { useEffect, useState } from "react";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ArcElement, DoughnutController } from "chart.js";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { DonutChart, NumberChart, ProgressWraper } from "./ProgressEtap.styled";

Chart.register(ArcElement, DoughnutController);

interface UsersActivities {
  false: boolean;
  etap_id: string;
  id_course: string;
}
interface Users {
  etap_id: string;
  user_id: String;
}
function ProgressEtap() {
  const user = useUser();
  const activities = useFirebaseFetch<UsersActivities>("activities");
  const userActivitiesData = useFirebaseFetch<Users>("user_activities");
  const [userProgress, setUserProgress] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const userActivitiesRef = collection(db, "user_activities");

      const unsubscribe = onSnapshot(userActivitiesRef, (snapshot) => {
        const newUserActivitiesData = snapshot.docs.map((doc) => doc.data());
        const filteredUserActivities = newUserActivitiesData.filter(
          (activity) => activity.user_id === user.uid
        );

        const progress =
          (filteredUserActivities.length / activities.length) * 100;
        setUserProgress(progress);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user, activities]);

  const data = {
    datasets: [
      {
        data: [userProgress ?? 0, 100 - (userProgress ?? 0)],
        backgroundColor: ["#020246", "#d9d9d9"],
        hoverBackgroundColor: ["#020246", "#d9d9d9"],
      },
    ],
  };

  const chartOptions = {
    elements: {
      arc: {
        borderWidth: 0, // display border
      },
    },
    cutout: "70%", // circle inside chart
  };

  return (
    <>
      <ProgressWraper>
        <h2>Twój wynik</h2>
        {user && userProgress !== null ? (
          <DonutChart key={user.uid}>
            <Doughnut
              data={data}
              options={chartOptions}
            />
            <NumberChart>{userProgress.toFixed(0)}%</NumberChart>
          </DonutChart>
        ) : (
          <div>Ładowanie...</div>
        )}
      </ProgressWraper>
    </>
  );
}

export default ProgressEtap;
