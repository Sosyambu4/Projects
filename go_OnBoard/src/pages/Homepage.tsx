import { StagesContainer } from "../components/HomePageComponents/StagesContainer";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import "./../index.css";
import { useUser } from "../components/RequireAuth/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Introduction from "../components/HomePageComponents/Introduction";
import { database } from "../utils/firebase/firebase.config";
import Calendar from "../components/HomePageComponents/Calendar";
import { BuddyContainer, BuddyImg, BuddyImgContainer, BuddyNameBlock } from "../components/HomePageComponents/Buddy.styled";
import buddyImgUrl from "../assets/pliki-svg-dashboard/buddy.svg";
import "../index.css";
import { RowContainer } from "./HomepageContainer.styled";
import { DashboardContainer } from "./HomepageContainer.styled";

export const HomePageLayout = () => {
  const user = useUser();
  const [showIntroduction, setShowIntroduction] = useState<boolean>(false);

  useEffect(() => {
    async function checkIntroduction() {
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        if (!userData?.introduction) {
          setShowIntroduction(true);
        }
      }
    }
    checkIntroduction();
  }, [user]);

  return (
    <DashboardContainer>
      {showIntroduction && <Introduction />}
      <RowContainer>
        <WelcomeContainer />
        <Calendar />
      </RowContainer>
      <RowContainer>
        <StagesContainer />
        <BuddyContainer>
          <BuddyNameBlock>
            <h4>Buddy</h4>
          </BuddyNameBlock>
          <BuddyImgContainer>
            <BuddyImg src={buddyImgUrl} alt="buddy" />
            <p style={{ marginBottom: "2px", fontSize: "13px" }}>FrontEnd Senior</p>
            <p style={{ marginTop: "2px", fontSize: "13px" }}>trener@infoShare.pl</p>
          </BuddyImgContainer>
        </BuddyContainer>
      </RowContainer>
    </DashboardContainer>
  );
};
