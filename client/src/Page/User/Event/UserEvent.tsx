import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { Events } from "./UserEventBox";
import { api_origin } from "../../../service/api";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../Component/AlertBox/AlertYesNoBox";
import { AlertLoadingBox } from "../../../Component/AlertBox/AlertLoadingBox";

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
    setShowAlert("loading");
    const project = "推普之友";
    const res = await fetch(`${api_origin}/event`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project: project,
      }),
    });
    const json = await res.json();
    const filteredEvents = json
      .filter((event: any) => event.isDeleted === false)
      .reverse();
    setEvents(filteredEvents);
    setShowAlert("");
  };

  const handleCheckEventFullOrNot = async (
    eventId: string,
    userId: string | null
  ) => {
    //Check user was already joined or not
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

  //TODO
  const handleCheckParticipant = async (eventId: string) => {
    //Check the participant of event is full or not
    const participantAmt = await fetch(
      `${api_origin}/record/checkParticipant`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          eventId: eventId,
        }),
      }
    );
    const participantRes = await participantAmt.json();
    console.log(participantRes, "participantRes");

    return participantRes.result;
  };

  const handleJoinEvent = async (
    eventId: string,
    userId: string | null,
    CheckIsConfirmYes?: string
  ) => {
    setGetEventsID(eventId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認報名該活動？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

    setShowAlert("loading");

    //TODO 參加之前，check活動是否已經人數已滿
    console.log(eventId, "GetID");

    const checkParticipant = await handleCheckParticipant(eventId);
    console.log(checkParticipant, "checkParticipantFront");

    if (checkParticipant) {
      setShowAlert("報名人數已滿!");

      return;
    }

    const result = await handleCheckEventFullOrNot(eventId, userId);

    if (result.joined === true) {
      setShowAlert("已報名活動!");
      return;
    }

    if (result.full === false) {
      const userId = localStorage.getItem("ef2023_user_id");
      const project = "推普之友";

      const res = await fetch(`${api_origin}/record/event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          eventId: eventId,
          project: project,
        }),
      });
      const json = await res.json();
      if (json.success) {
        // //Updated event participant
        // const updateRes = await fetch(`${api_origin}/record/eventUpdate`, {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     eventId: eventId,
        //   }),
        // });
        // const updateResJson = await updateRes.json();
        // console.log(updateResJson, "Check event");

        await handleGetAllEvents();
        setShowAlert("報名成功!");
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

      {showAlert === "loading" && <AlertLoadingBox />}
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
      {showAlert === "報名人數已滿!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
