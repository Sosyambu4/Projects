import { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";
import { Quiz } from "../Quiz/Quiz";
import { DetailsWraper, LinkFetched, HeaderInfo, HeaderInfoButton } from "./Activities.styled";
import LinkFetchedHeader from "./LinkFetchedHeader";
import IconFetchedHeader from "./IconFetchedHeader";
import ReactModal from "react-modal";
import ReactPlayer from "react-player/youtube";

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  comment?: string;
  link?: string;
  movie?: string;
  action?: string;
  test: boolean | string;
  currentActivityy: {
    test: boolean;
  };
  // setCurrentActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  detailProps: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
}

function ActivitiesDetail(props: Props) {
  const [activitiesDetail, setActivitiesDetail] = useState<Activity[]>([]);
  const [fetchedLink, setFetchedLink] = useState<string | undefined>(undefined);
  const [fetchedMovie, setFetchedMovie] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentActivity, setCurrentActivity] = useState<Activity>();
  const confirmActivityProps = {
    activitiesId: props.detailProps.activitiesId,
    etap_id: props.detailProps.etap_id,
    onActivityConfirmation: props.detailProps.onActivityConfirmation,
  };

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = activitiesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  useEffect(() => {
    // fetch only the link and movie from the activities, if link/movie =-1 change state
    const activity = activitiesDetail.find((activity) => activity.id === props.detailProps.activitiesId);
    if (activity) {
      if (activity.link && activity.link !== "-1") {
        setFetchedLink(activity.link || undefined);
      } else {
        setFetchedLink(undefined);
      }

      if (activity.movie && activity.movie !== "-1") {
        setFetchedMovie(activity.movie || undefined);
      } else {
        setFetchedMovie(undefined);
      }

      setCurrentActivity(activity);
    }

    setCurrentActivity(activity);
  }, [activitiesDetail, props.detailProps.activitiesId]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "4",
    },
  };

  return (
    <DetailsWraper>
      {activitiesDetail
        .filter((detail) => detail.id === props.detailProps.activitiesId)
        .map((filteredEtap) => {
          return (
            <div className="detailsContent" key={filteredEtap.id}>
              <h3>{filteredEtap.name}</h3>
              <span>{filteredEtap.description}</span>

              <LinkFetched>
                <HeaderInfo>
                  <IconFetchedHeader iconName={filteredEtap.type || ""} />
                  <LinkFetchedHeader text={filteredEtap.action || ""} />
                </HeaderInfo>
                <HeaderInfoButton>
                  {(fetchedLink || fetchedMovie) &&
                    (fetchedLink ? (
                      <a href={fetchedLink} target="_blank" rel="noopener noreferrer">
                        <button className="confirmButton">Przejdź do strony</button>
                      </a>
                    ) : (
                      fetchedMovie && (
                        <>
                          <button className="confirmButton" onClick={() => setIsModalOpen(true)}>
                            Obejrzyj film
                          </button>

                          <ReactModal
                            className="Modal"
                            overlayClassName="Overlay"
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            shouldCloseOnOverlayClick={false}>
                            <div className="modalContent">
                              <ReactPlayer url={fetchedMovie} className="react-player" playing controls />
                              <button className="closeButton" onClick={() => setIsModalOpen(false)}>
                                Zamknij
                              </button>
                            </div>
                          </ReactModal>
                        </>
                      )
                    ))}
                  {currentActivity && currentActivity?.test === true ? <Quiz etapIdForQuiz={confirmActivityProps} /> : ""}
                </HeaderInfoButton>
              </LinkFetched>
              {filteredEtap.comment && <CommentActivity activitiesId={props.detailProps.activitiesId} />}
              <ConfirmActivity confirmActivityProps={confirmActivityProps} currentActivityy={currentActivity} />
            </div>
          );
        })}
    </DetailsWraper>
  );
}

export default ActivitiesDetail;
