import {
  Footer,
  LeftFoot,
  LogoImgFooter,
  LogoNameFooter,
  RightFoot,
} from "./Sign.styled";
import imgLogo from "../../assets/signin/Logo.png";

export const FooterMain = () => {
  return (
    <>
      <Footer>
        <LeftFoot>
          <LogoImgFooter
            src={imgLogo}
            alt="logo"></LogoImgFooter>
        </LeftFoot>
        <RightFoot>
          <LogoNameFooter>
            <b>GO!</b> onBoard
          </LogoNameFooter>
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDDHzcpblDzkgQvCFwsgbGgZWNZmQvQHdVkVXTQCpztCghcmgVsNkDkRjlVBpkZkGBtCXw">
            Napisz do nas
          </a>
          <p>Design © Grupa2 2023</p>
        </RightFoot>
      </Footer>
    </>
  );
};
