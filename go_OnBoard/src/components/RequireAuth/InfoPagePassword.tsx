import { Card, Card2, Cards, ImgMain, LinkName, LogoImg, LogoName, NamePage, TextString } from "./Sign.styled";
import imgProgrammer from "../../assets/signin/Chlopak.png";
import imgLogo from "../../assets/signin/Logo.png";
import { FooterMain } from "./Footer";

export const InfoPagePassword = () => {
  return (
    <>
      <Cards>
        <Card2>
          <ImgMain src={imgProgrammer} alt="programista"></ImgMain>
        </Card2>
        <Card>
          <LogoImg src={imgLogo} alt="logo"></LogoImg>

          <LogoName>
            <b>GO!</b> onBoard
          </LogoName>
          <NamePage>Hasło zrestartowane</NamePage>
          <TextString>Na Twój adres e-mail wysłaliśmy link resetujący hasło</TextString>
          <p>
            <LinkName>
              <a href="/">Logowanie</a>
            </LinkName>
          </p>
        </Card>
      </Cards>
      <FooterMain />
    </>
  );
};
