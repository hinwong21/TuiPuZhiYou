import React, { useEffect, useState } from "react";
import { Events } from "../../User/Event/UserEventBox";
import { api_origin } from "../../../service/api";

export const DeleteEvent = () => {
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
      <div className="userEventHeader">刪除活動</div>

      <div className="eventBoardContainer">
        <Events eventID="1" details="" image="#" btnCall="刪除" />
        <Events
          eventID="2"
          details="活動2,活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名活動報名"
          image=""
          btnCall="刪除"
        />
      </div>
    </>
  );
};
