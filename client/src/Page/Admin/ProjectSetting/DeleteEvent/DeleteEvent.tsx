import React, { useEffect, useState } from "react";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../../Component/AlertBox/AlertYesNoBox";
import { Events } from "./AdminEventBox";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface EventItem {
  eventId: string;
  name: string;
  image: string;
  details: string;
}

interface DeleteEventProps {
  goBack: () => void;
}

export const DeleteEvent: React.FC<DeleteEventProps> = ({ goBack }) => {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [getEventID, setGetEventID] = useState("");
  const [showAlert, setShowAlert] = useState("");

  //Get all events
  const handleGetAllEvents = async () => {
    setShowAlert("loading");
    const project = "香港青年陽光力量";
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

  const handleDeleteEvent = async (
    eventId: string,
    CheckIsConfirmYes?: string
  ) => {
    setGetEventID(eventId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認刪除？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

    setShowAlert("loading");
    //Get DB data
    const res = await fetch(`${api_origin}/event/delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
      }),
    });
    const json = await res.json();
    if (json.success) {
      await handleGetAllEvents();
      setShowAlert("成功刪除!");
    } else {
      setShowAlert("未能刪除，請稍後再嘗試!");
    }
  };

  useEffect(() => {
    handleGetAllEvents();
  }, []);

  return (
    <>
      <div className="changePasswordContainer">
        <SubPageHeader title="刪除活動" goBack={goBack} />

        <div className="eventBoardContainer">
          {events?.map((event: any) => (
            <Events
              key={event.event_id}
              name={event.event_name}
              eventID={event.event_id}
              image={event.event_image}
              details={event.event_detail}
              btnCall="刪除"
              onClick={() => handleDeleteEvent(event.event_id, "")}
            />
          ))}
        </div>
      </div>

      {showAlert === "是否確認刪除？" && (
        <AlertYesNoBox
          header={showAlert}
          btnNameOne={{
            btnName: "是",
            onClick: () => handleDeleteEvent(getEventID),
          }}
          btnNameTwo={{
            btnName: "否",
            onClick: () => handleDeleteEvent(getEventID, "false"),
          }}
        />
      )}

      {showAlert === "loading" && <AlertLoadingBox />}
      {showAlert === "成功刪除!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能刪除，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
