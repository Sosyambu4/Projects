import styled from "styled-components";

export const LogoName = styled.p`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

export const NamePage = styled.h1`
  font-weight: 500;
  font-size: 180%;
  text-align: center;
  padding-bottom: 25px;
`;

export const LogoImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 39px;
  width: 75px;
  height: 89.95px;
`;

export const Input = styled.input`
  box-sizing: border-box;

  padding: 10px 14px;

  width: 18rem;
  height: 44px;

  border: 1px solid #d0d5dd;

  border-radius: 8px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`;

export const FormSign = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin-top: 30px;
  width: 161px;
  height: 48px;
  box-shadow: 8px 8px 24px rgba(2, 2, 70, 0.15);
`;

export const LinkName = styled.p`
  font-size: 18px;
  text-align: center;
`;

export const ImgMain = styled.img`
  width: 40rem;
  height: 40rem;
  position: relative;
  top: 5rem;
`;

export const TextString = styled.p`
  text-align: center;
  color: red;
  width: 85%;
`;

export const Card = styled.div`
  padding: 0px 1rem;
  display: flex;
  height: auto;
  box-shadow: rgba(2, 2, 70, 0.05) 8px 8px 24px;
  border-radius: 31.2294px;
  background-color: white;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 1200px) {
    width: 470px;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
`;

export const Card2 = styled.div`
  padding: 1rem;
  min-height: 700px;
  height: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Cards = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;

  flex: 1;

  @media (max-width: 1200px) {
    justify-items: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  text-align: center;
  color: #020246;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 5px;
  padding-bottom: 20px;
  background-color: #ffffff;
  width: 100%;
  margin-top: 2rem;
`;

export const LogoImgFooter = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 39px;
  width: 45px;
  height: 59.95px;
`;

export const LogoNameFooter = styled.p`
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  line-height: 5px;
`;

export const LeftFoot = styled.div`
  padding: 0px 15px 0px 0px;
`;

export const RightFoot = styled.div`
  padding: 35px 0px 0px 0px;
`;

export const GlobalStyles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
