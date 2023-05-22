import React, { useState, useEffect, useMemo } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ActivitiesDetail from "./ActivitiesDetail";
import { ActivitiesContainer, ActivitiName, Container, Transparent } from "./Activities.styled";
import { useParamsStagesHook } from "../hooks/useParamsStagesHook";
import { useStages } from "../button/Context/StagesContext";
import IconFetchedHeader from "./IconFetchedHeader";

interface Activity {
  id: string;
  name: string;
  type: string;
  etap_id: string;
  sort: number;
}

function Activities() {
  const { etapId, handleActivityConfirmation } = useStages();
  const etapsID = useParamsStagesHook();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesId, setActivitiesId] = useState<string | null>(null);
  const [selectedActivitiesId, setSelectedActivitiesId] = useState<string | null>(null);

  const detailProps =
    activitiesId && etapsID
      ? {
          activitiesId: activitiesId,
          etap_id: etapsID,
          onActivityConfirmation: handleActivityConfirmation,
        }
      : null;

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray: Activity[] = [];
      activitiesData.forEach((doc) => {
        activitiesArray.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          etap_id: doc.data().etap_id,
          sort: doc.data().sort,
        });
      });
      setActivities(activitiesArray);
    };
    getActivities();
  }, []);

  useEffect(() => {
    setActivitiesId(null); // Reset activitiesId state when etap prop changes
  }, [etapsID]);

  const sortedActivities = [...activities].sort((a, b) => a.sort - b.sort);

  return (
    <Container>
      <ActivitiesContainer>
        {sortedActivities
          .filter((activit) => activit.etap_id === etapsID)
          .map((filteredEtap) => {
            return (
              <Transparent
                onClick={() => {
                  setActivitiesId(filteredEtap.id);
                  setSelectedActivitiesId(filteredEtap.id);
                }}
                style={{
                  color: filteredEtap.id === selectedActivitiesId ? "var(--active)" : "var(--primary-1)",
                  filter: filteredEtap.id === selectedActivitiesId ? "invert(53%) sepia(7%) saturate(6913%) hue-rotate(67deg) brightness(106%) contrast(70%)" : "",
                }}
                key={filteredEtap.id}>
                <ActivitiName>{filteredEtap.name}</ActivitiName>
                <IconFetchedHeader iconName={filteredEtap.type || ""} />
              </Transparent>
            );
          })}
      </ActivitiesContainer>
      {/* Hide details before button click  */}

      {detailProps && <ActivitiesDetail detailProps={detailProps} />}
    </Container>
  );
}

export default Activities;
