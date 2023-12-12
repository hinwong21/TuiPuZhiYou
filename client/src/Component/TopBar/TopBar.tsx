import React from "react";
import "./TopBar.css";
import sponsor from "../../uploads/E&Clogo.png";
import logo from "../../uploads/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface TopBarProps {
  userName: string;
}

export const TopBar = (props: TopBarProps) => {
  return (
    <div className="topBarContainer">
      <section className="topBarLogoContainer">
        <div className="topBarLogo">
          <div className="topBarLogoTitle">資助</div>
          <img src={sponsor} alt="sponsor logo" className="topBarLogoImage" />
        </div>

        <div className="topBarLogo">
          <div className="topBarLogoTitle">主辦</div>
          <img src={logo} alt="logo" className="topBarLogoImage" />
        </div>
      </section>

      <div className="topBarUsernameBtnContainer">
        <div>{props.userName}</div>
        <section className="topBarLoginContainer">
          <div className="topBarLoginButton">
            {props.userName ? <FontAwesomeIcon icon={faBars} /> : "登入｜注册"}
          </div>
        </section>
      </div>
    </div>
  );
};
