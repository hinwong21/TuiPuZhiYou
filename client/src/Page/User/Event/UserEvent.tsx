import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { Events } from "./UserEventBox";
import { api_origin } from "../../../service/api";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../Component/AlertBox/AlertYesNoBox";

interface EventItem {
  eventId: string;
  name: string;
  image: string;
  details: string;
}

export const UserEvent = () => {
  const [showAlert, setShowAlert] = useState("");
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const userId = localStorage.getItem("ef2023_user_id");
  const [getEventsID, setGetEventsID] = useState("");

  const handleGetAllEvents = async () => {
    const res = await fetch(`${api_origin}/event/`, {
      method: "GET",
    });
    const json = await res.json();
    const filteredEvents = json.filter(
      (event: any) => event.isDeleted === false
    );
    setEvents(filteredEvents);
  };

  const handleCheckEventFullOrNot = async (
    eventId: string,
    userId: string | null
  ) => {
    const res = await fetch(`${api_origin}/event/participant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        eventId: eventId,
      }),
    });
    const json = await res.json();
    return json.result;
  };

  const handleJoinEvent = async (
    eventId: string,
    userId: string | null,
    CheckIsConfirmYes?: string
  ) => {
    await setShowAlert("");
    setGetEventsID(eventId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認報名該活動？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

    const result = await handleCheckEventFullOrNot(eventId, userId);

    if (result.joined === true) {
      setShowAlert("已報名活動!");
      return;
    }

    if (result.full === false) {
      const userId = localStorage.getItem("ef2023_user_id");
      const res = await fetch(`${api_origin}/record/event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowAlert("報名成功!");
        handleGetAllEvents();
      } else {
        setShowAlert("未能報名，請稍後再嘗試!");
      }
    }
  };

  useEffect(() => {
    handleGetAllEvents();
  }, []);

  return (
    <>
      <div className="userEventHeader">活動報名</div>

      <div className="eventBoardContainer">
        {events?.map((event: any) => (
          <Events
            key={event.event_id}
            eventID={event.event_id}
            name={event.event_name}
            image={event.event_image}
            details={event.event_detail}
            participant={event.participant}
            participantCount={event.participantCount}
            btnCall="參加"
            onClick={() => handleJoinEvent(event.event_id, userId, "")}
          />
        ))}
      </div>

      {showAlert === "是否確認報名該活動？" && (
        <AlertYesNoBox
          header={showAlert}
          btnNameOne={{
            btnName: "是",
            onClick: () => handleJoinEvent(getEventsID, userId),
          }}
          btnNameTwo={{
            btnName: "否",
            onClick: () => handleJoinEvent(getEventsID, userId, "false"),
          }}
        />
      )}

      {showAlert === "已報名活動!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "報名成功!" && (
        <AlertConBox
          header={
            <div>
              報名活動成功!
              <br />
              詳情可在
              <br />
              我的資料-活動報名詳情查看
            </div>
          }
          btnName={"確認"}
        />
      )}
      {showAlert === "未能報名，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
