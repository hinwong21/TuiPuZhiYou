import React from "react";
import "./TopBar.css";
import sponsor from "../../uploads/E&Clogo.png";
import logo from "../../uploads/logo.png";

export const TopBar = () => {
  return (
    <header className="topBarContainer">
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

      <section className="topBarLoginContainer">
        <div className="topBarLoginButton">登入｜注册</div>
      </section>
    </header>
  );
};