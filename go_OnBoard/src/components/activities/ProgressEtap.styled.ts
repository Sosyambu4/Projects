import { Link } from "react-router-dom";
import styled from "styled-components";

interface StagesLinksProps {
  to: string;
}

export const ProgressWraper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  margin: 30px auto 15px;
  gap: 25px;
`;

export const DonutChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 70px;
  height: 70px;
`;

export const NumberChart = styled.div`
  z-index: 3;
  position: absolute;
  font-weight: 700;
`;

export const EtapsIcon = styled.img`
  filter: brightness(0) saturate(100%) invert(97%) sepia(97%) saturate(0%)
    hue-rotate(46deg) brightness(102%) contrast(105%);
`;

export const EtapsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StagesLinks = styled(Link)<StagesLinksProps>`
  height: 40px;
  width: 126px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  /* font-size: 1em; */
  font-weight: 500;
  font-family: inherit;
  background-color: var(--primary-1);
  cursor: pointer;
  transition: border-color 0.25s;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const StagesSrc = styled.a`
  color: var(--secondary-2);
`;

export const HeadEtaps = styled.a`
  color: var(--primary-1);

  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  gap: 3rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
    gap: 0rem;
  }
`;

export const LogoImgHeader = styled.img`
  width: auto;
  height: auto;
`;

export const TitleEtaps = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;
