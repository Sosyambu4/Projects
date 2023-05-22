import styled from "styled-components";

export const GreetingBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  height: fit-content;
  background: linear-gradient(89.82deg, #687ec9 1.25%, #5971c3 98.38%);
  color: #ffffff;
  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.05);
  border-radius: 31.2294px;
  position: relative;
  flex: 1;
  max-width: 770px;
  min-width: 355px;
  min-height: 365px;
  margin: 10px;

  @media (max-width: 415px) {
    padding: 10px;
    margin: 20px;
  }
`;

export const ImgBlock = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 1250px) {
    position: absolute;
    opacity: 0.4;
  }
`;

export const GreetingName = styled.div`
  height: auto;
`;

export const DashboardGreeting = styled.div`
  height: auto;

  @media (max-width: 1250px) {
    position: relative;
  }
`;
