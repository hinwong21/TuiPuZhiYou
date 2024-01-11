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
  const isVolunteer = localStorage.getItem("ef2023_isVolunteer");
  const isAdmin = Boolean(localStorage.getItem("ef2023_isAdmin"));

  const handleShowBar = () => {
    setShowBar(!showBar);
  };

  const handleStatus = (newStatus: string) => {
    setShowBar(!showBar);
    props.onStatusChange(newStatus);
    localStorage.setItem("ef2023_pageState", newStatus);
    const pageStateExpirationTime = new Date().getTime() + 5 * 60 * 1000;
    const pageStateExpirationTimeStr = pageStateExpirationTime.toString();
    localStorage.setItem("pageStateExpirationTime", pageStateExpirationTimeStr);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("ef2023_user_id");
    localStorage.removeItem("ef2023_isVolunteer");
    localStorage.removeItem("ef2023_isAdmin");
    localStorage.removeItem("ef2023_isManager");
    localStorage.removeItem("ef2023_pageState");
    localStorage.removeItem("pageStateExpirationTime");
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

      {showBar && isVolunteer === "false" ? (
        // user version
        <div className="topBarSideBarContainer">
          <div className="topBarSideBarIcon" onClick={handleShowBar}>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "28px" }} />
          </div>
          <SideBarSession
            title="我的資料"
            onClick={() => handleStatus("userInfo")}
          />
          <SideBarSession
            title="換領禮物"
            onClick={() => handleStatus("userGift")}
          />
          <SideBarSession
            title="活動報名"
            onClick={() => handleStatus("userEvent")}
          />
          <div className="topBarSideBarSessionLogout" onClick={handleLogout}>
            登出
          </div>
        </div>
      ) : // admin version
      showBar && isVolunteer === "true" ? (
        <div className="topBarSideBarContainer">
          <div className="topBarSideBarIcon" onClick={handleShowBar}>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "28px" }} />
          </div>
          <SideBarSession
            title="搜尋用戶"
            onClick={() => handleStatus("searchUser")}
          />
          <SideBarSession
            title="禮物登記"
            onClick={() => handleStatus("giftRegistration")}
          />
          <SideBarSession
            title="計劃詳情"
            onClick={() => handleStatus("projectDetails")}
          />
          <SideBarSession
            locked
            hasPermission={isAdmin}
            title="計劃設置"
            onClick={() => handleStatus("projectSetting")}
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
