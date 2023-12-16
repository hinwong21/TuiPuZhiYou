import React, { useState } from "react";
import { GiftDetail } from "./GiftDetail/GiftDetail";
import { EventDetail } from "./EventDetail/EventDetail";
import { UserDetail } from "./UserDetail/UserDetail";

export const ProjectDetails = () => {
  const [status, setStatus] = useState<string>("");

  const handleSessionClick = (newStatus: string) => {
    setStatus(newStatus);
  };
  return (
    <div className="projectSettingContainer">
      {status === "" && (
        <>
          <header className="projectSettingHeader">計劃詳情</header>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("userDetail")}
          >
            用戶詳情
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("giftDetail")}
          >
            換領禮物詳情
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("eventDetail")}
          >
            活動報名詳情
          </div>
        </>
      )}
      {status === "userDetail" && (
        <UserDetail goBack={() => handleSessionClick("")} />
      )}
      {status === "giftDetail" && (
        <GiftDetail goBack={() => handleSessionClick("")} />
      )}
      {status === "eventDetail" && (
        <EventDetail goBack={() => handleSessionClick("")} />
      )}
    </div>
  );
};
