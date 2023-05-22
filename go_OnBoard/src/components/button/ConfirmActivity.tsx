import React, { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { useUser } from "../RequireAuth/context/AuthContext";
import { Activity } from "../activities/ActivitiesDetail";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { QuerySnapshot } from "firebase/firestore";

interface ConfirmActivityProps {
  confirmActivityProps: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
  currentActivityy: Activity | undefined;
}

interface QuizCollection {
  result: number;
  user_id: string;
  id: string;
  etapId: string;
  save_quiz: boolean;
}

interface UserActivitiesCollection {
  id: string;
  user_activity_id: string;
  user_id: string;
}

const ConfirmActivity: React.FC<ConfirmActivityProps> = (props) => {
  const user = useUser();
  const [activityChecked, setActivityChecked] = useState<boolean>(false); // flag for check button
  const [checkedActivityId, setCheckedActivityId] = useState<string | null>(null); // state to track the checked activity
  const [isDisabled, setIsDisabled] = useState<boolean>(true); // state to disable the button if the activity has already been checked
  const [hasMounted, setHasMounted] = useState<boolean>(false); // flag to indicate whether the component has mounted
  const [points, setPoints] = useState<QuizCollection[]>([]);

  const activiti: string = props.confirmActivityProps.activitiesId || "";
  const etap_id: string = props.confirmActivityProps.etap_id;

  // Fetch the user_activities collection and check if there's a document with a true value for the result field
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(database, "user_activities"),
        where("user_activity_id", "==", activiti),
        where("user_id", "==", user?.uid) // Add this condition
      );
      const querySnapshot = await getDocs(q);
      const hasResult = querySnapshot.docs.some((doc) => doc.data().result);

      const hasActivity = querySnapshot.docs.some((doc) => doc.data().user_activity_id === activiti && doc.data().user_id === user?.uid);

      setIsDisabled(hasResult || hasActivity); // disable the button if the activity has already been checked or user_id doesn't match or activity already exists
      setHasMounted(true);
    };

    fetchData();
  }, [activiti, user?.uid]);

  function checkActivity(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const checkRef = collection(database, "user_activities");
    if (!user?.uid) return;
    const newCheck = {
      result: true, // set the result field to true
      check_date: serverTimestamp(),
      user_activity_id: activiti,
      etap_id: etap_id,
      user_id: user?.uid,
    };
    setDoc(doc(checkRef), newCheck)
      .then(() => {
        setActivityChecked(true);
        setCheckedActivityId(activiti); // set the checked activity id
        setIsDisabled(true); // disable the button
        props.confirmActivityProps.onActivityConfirmation(activiti);
      })
      .catch(() => console.log("Error"));
  }

  //fetch collection user_activities to check if user already checked current activitie

  const userActivitiesCollection = useFirebaseFetch<UserActivitiesCollection>("user_activities");
  const currentUserActivity = userActivitiesCollection.find((currentId) => currentId?.user_activity_id === activiti && currentId.user_id === user?.uid);

  // /listening when the result of quiz will changed to enable or disable the button "zapisz krok"
  useEffect(() => {
    const pointsRef = collection(database, "user_quiz_points");
    const pointsQuery = query(pointsRef, where("user_id", "==", user?.uid));
    const unsubscribe = onSnapshot(pointsQuery, (snapshot) => {
      const newPoints: QuizCollection[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        user_id: doc.data().user_id,
        result: doc.data().result,
        etapId: doc.data().etap_id,
        save_quiz: doc.data().save_quiz,
        ...doc.data(),
      }));
      setPoints(newPoints);

      const userPoints: QuizCollection | undefined = newPoints.find((point) => point.user_id === user?.uid && point.etapId === etap_id);

      if (userPoints?.result === undefined && (props.currentActivityy?.test === undefined || props.currentActivityy.test === true)) {
        setIsDisabled(true);
      } else if (userPoints?.result !== undefined && props.currentActivityy?.test === true && userPoints.result >= 75) {
        setIsDisabled(false);
      } else if (userPoints?.result !== undefined && props.currentActivityy?.test === true && userPoints.result < 75) {
        setIsDisabled(true);
      }

      if (activiti === currentUserActivity?.user_activity_id && userPoints?.result !== undefined && props.currentActivityy?.test === true && userPoints.result >= 75) {
        setIsDisabled(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [props.currentActivityy, currentUserActivity]);

  return (
    <button
      className="confirmButton"
      onClick={checkActivity}
      disabled={!hasMounted || isDisabled} // disable the button if the component hasn't mounted or the activity has already been checked, without this: button is mounted at first, so i could add few data to firebase
    >
      Zapisz krok
    </button>
  );
};

export default ConfirmActivity;
