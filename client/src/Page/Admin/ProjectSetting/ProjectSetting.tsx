import React, { useState } from "react";
import "./ProjectSetting.css";
import { EditGift } from "./EditGift";
import { EditEvent } from "./EditEvent";
import { ChangePassword } from "./ChangePassword";

export const ProjectSetting = () => {
  const [status, setStatus] = useState<string>("");

  const handleSessionClick = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div className="projectSettingContainer">
      {status === "" && (
        <>
          <header className="projectSettingHeader">計劃設置</header>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("editGift")}
          >
            編輯禮物
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("editEvent")}
          >
            編輯活動
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("changePassword")}
          >
            更改密碼
          </div>
        </>
      )}

      {status === "editGift" && <EditGift />}
      {status === "editEvent" && <EditEvent />}
      {status === "changePassword" && <ChangePassword />}
    </div>
  );
};
