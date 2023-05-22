import styled from "styled-components";

export const DashboardContainer = styled.div`
  /* margin: 40px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 40px;
  margin-top: 30px;
  width: 100%;
  flex-wrap: wrap;
  align-content: center;

  @media (max-width: 1005px) {
    flex-direction: row;
    align-items: stretch;
  }
`;
