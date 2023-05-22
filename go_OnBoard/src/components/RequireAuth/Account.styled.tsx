import styled from "styled-components";
import logoutImgUrl from "../../assets/pliki-svg-dashboard/logout-svgrepo-com.svg";

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 355px; */

  @media (max-width: 875px) {
    max-width: 770px;
    align-items: center;
  }
`;

export const LogOutBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  height: 60px;
  flex-grow: 1;
  width: 365px;

  @media (max-width: 875px) {
    max-width: 670px;
    align-items: stretch;
    align-content: stretch;
    width: 665px;
  }

  @media (max-width: 725px) {
    width: 565px;
  }

  @media (max-width: 630px) {
    width: 465px;
  }

  @media (max-width: 530px) {
    width: 355px;
  }
`;

export const BtnLogOut = styled.button`
  background-image: url(${logoutImgUrl});
  background-size: cover;
  background-color: white;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-top: 8px;
`;

export const AccountBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 355px;

  @media (max-width: 875px) {
    max-width: 770px;
  }
`;

export const AccountInfo = styled.p`
  margin: 3px;
`;
