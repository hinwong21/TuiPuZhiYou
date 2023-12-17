import React, { useState } from "react";
import "./TopBar.css";
import sponsor from "../../uploads/E&Clogo.png";
import logo from "../../uploads/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SideBarSession } from "./Component/SideBarSession";

interface TopBarProps {
  userName: string;
  onStatusChange: (newStatus: string) => void;
}

export const TopBar = (props: TopBarProps) => {
  const [showBar, setShowBar] = useState(false);

  const isAdmin = localStorage.getItem("ef2023_isAdmin");

  const handleShowBar = () => {
    setShowBar(!showBar);
  };

  const handleStatus = (newStatus: string) => {
    setShowBar(!showBar);
    props.onStatusChange(newStatus);
    localStorage.setItem("ef2023_pageState", newStatus);
    const expirationTime = new Date().getTime() + 30 * 60 * 1000;
    const expirationTimeStr = expirationTime.toString();
    localStorage.setItem("expirationTime", expirationTimeStr);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("ef2023_user_id");
    localStorage.removeItem("ef2023_isAdmin");
    localStorage.removeItem("ef2023_pageState");
    localStorage.removeItem("expirationTime");
    window.location.href = "/";
  };

  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <div className="topBarContainer">
      <section className="topBarLogoContainer" onClick={handleRedirect}>
        <div className="topBarLogo">
          <div className="topBarLogoTitle">資助</div>
          <img src={sponsor} alt="sponsor logo" className="topBarLogoImage" />
        </div>

        <div className="topBarLogo">
          <div className="topBarLogoTitle">主辦</div>
          <img src={logo} alt="logo" className="topBarLogoImage" />
        </div>
      </section>

      {showBar && isAdmin === "false" ? (
        // user version
        <div className="topBarSideBarContainer">
          <div className="topBarSideBarIcon" onClick={handleShowBar}>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "28px" }} />
          </div>
          <SideBarSession
            title="我的資料"
            handleStatus={() => handleStatus("userInfo")}
          />
          <SideBarSession
            title="換領禮物"
            handleStatus={() => handleStatus("userGift")}
          />
          <SideBarSession
            title="活動報名"
            handleStatus={() => handleStatus("userEvent")}
          />
          <div className="topBarSideBarSessionLogout" onClick={handleLogout}>
            登出
          </div>
        </div>
      ) : // admin version
      showBar && isAdmin === "true" ? (
        <div className="topBarSideBarContainer">
          <div className="topBarSideBarIcon" onClick={handleShowBar}>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "28px" }} />
          </div>
          <SideBarSession
            title="搜尋用戶"
            handleStatus={() => handleStatus("searchUser")}
          />
          <SideBarSession
            title="禮物登記"
            handleStatus={() => handleStatus("giftRegistration")}
          />
          <SideBarSession
            title="計劃設置"
            handleStatus={() => handleStatus("projectSetting")}
          />
          <SideBarSession
            title="計劃詳情"
            handleStatus={() => handleStatus("projectDetails")}
          />
          <div className="topBarSideBarSessionLogout" onClick={handleLogout}>
            登出
          </div>
        </div>
      ) : (
        <div className="topBarUsernameBtnContainer">
          <div>{props.userName}</div>

          {props.userName ? (
            <section className="topBarLoginContainer" onClick={handleShowBar}>
              <div className="topBarLoginButton">
                <FontAwesomeIcon icon={faBars} />
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
