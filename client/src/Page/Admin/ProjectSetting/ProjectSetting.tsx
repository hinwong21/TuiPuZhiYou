import React, { useState } from "react";
import "./ProjectSetting.css";
import { AddGift } from "./AddGift/AddGift";
import { AddEvent } from "./AddEvent/AddEvent";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { DeleteGift } from "./DeleteGift/DeleteGift";
import { DeleteEvent } from "./DeleteEvent/DeleteEvent";
import { UploadFile } from "./UploadFile/UploadFile";

export const ProjectSetting = () => {
  const [status, setStatus] = useState<string>("");
  const isManager = localStorage.getItem("ef2023_isManager");

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
            onClick={() => handleSessionClick("addGift")}
          >
            添加禮物
          </div>
          <div
            className="projectSettingSession"
            onClick={() => handleSessionClick("addEvent")}
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
          {isManager === "true" && (
            <div
              className="projectSettingSession"
              onClick={() => handleSessionClick("changePassword")}
            >
              更改管理員密碼
            </div>
          )}
          {isManager === "true" && (
            <div
              className="projectSettingSession"
              onClick={() => handleSessionClick("uploadFile")}
            >
              上傳文件
            </div>
          )}
        </>
      )}

      {status === "addGift" && (
        <AddGift goBack={() => handleSessionClick("")} />
      )}
      {status === "addEvent" && (
        <AddEvent goBack={() => handleSessionClick("")} />
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
      {status === "uploadFile" && (
        <UploadFile goBack={() => handleSessionClick("")} />
      )}
    </div>
  );
};
