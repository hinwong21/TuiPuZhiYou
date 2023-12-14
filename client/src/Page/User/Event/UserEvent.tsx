import React, { useEffect } from "react";
import "./UserEvent.css";
import { Events } from "./UserEventBox";
import { api_origin } from "../../../service/api";

export const UserEvent = () => {
  const handleGetEventDetails = async () => {
    const res = await fetch(`${api_origin}/event/`, {
      method: "GET",
    });
    const json = await res.json();
    console.log(json);
  };

  useEffect(() => {
    handleGetEventDetails();
  }, []);

  return (
    <>
      <div className="userEventHeader">活動報名</div>

      <div className="eventBoardContainer">
        <Events eventID="1" details="" image="#" btnCall="參加" />
        <Events
          eventID="2"
          details="活動2,活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名"
          image=""
          btnCall="參加"
        />
      </div>
    </>
  );
};
