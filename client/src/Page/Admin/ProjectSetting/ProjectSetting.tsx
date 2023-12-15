import React, { useState } from "react";
import "./ProjectSetting.css";
import { EditGift } from "./EditGift/EditGift";
import { EditEvent } from "./EditEvent/EditEvent";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { DeleteGift } from "./DeleteGift/DeleteGift";
import { DeleteEvent } from "./DeleteEvent/DeleteEvent";

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
            添加禮物
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("editEvent")}
          >
            添加活動
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("deleteGift")}
          >
            刪除禮物
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("deleteEvent")}
          >
            刪除活動
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("changePassword")}
          >
            更改管理員密碼
          </div>
        </>
      )}

      {status === "editGift" && (
        <EditGift goBack={() => handleSessionClick("")} />
      )}
      {status === "editEvent" && (
        <EditEvent goBack={() => handleSessionClick("")} />
      )}
      {status === "deleteGift" && (
        <DeleteGift goBack={() => handleSessionClick("")} />
      )}
      {status === "deleteEvent" && (
        <DeleteEvent goBack={() => handleSessionClick("")} />
      )}

      {status === "changePassword" && (
        <ChangePassword goBack={() => handleSessionClick("")} />
      )}
    </div>
  );
};
