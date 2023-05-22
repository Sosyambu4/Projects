import styled from "styled-components";

export const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  max-width: 400px;
  height: 365px;
  box-shadow: rgb(0 0 0 / 15%) 4px 5px 10px;
  border-radius: 31.2294px;
  background-color: #ffffff;
  padding: 15px;
  margin: 10px;

  @media (max-width: 1005px) {
    max-width: 770px;
    flex-grow: 1;
  }

  @media (max-width: 875px) {
    max-width: 770px;
    align-items: stretch;
    justify-content: space-evenly;
  }

  @media (max-width: 415px) {
    padding: 10px;
    margin: 20px;
  }
`;

export const UserInfo = styled.span`
  display: flex;
  margin: 3px;
  align-items: center;
  align-content: center;
`;

export const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const UserInfoImgGift = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;

export const UserInfoResult = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;

export const UserInfoClock = styled.img`
  width: 35px;
  height: 35px;
  filter: none;
  margin-right: 15px;
`;
