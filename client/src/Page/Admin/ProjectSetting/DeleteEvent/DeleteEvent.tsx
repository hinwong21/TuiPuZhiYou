import React, { useEffect, useState } from "react";
import { Events } from "../../../User/Event/UserEventBox";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../../Component/AlertBox/AlertYesNoBox";

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

  //Get all events
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

  const [showAlert, setShowAlert] = useState("");

  const handleDeleteEvent = async (
    eventId: string,
    CheckIsConfirmYes?: string
  ) => {
    //await setShowAlert("");
    setGetEventID(eventId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認刪除？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

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
      setShowAlert("成功刪除!");
      handleGetAllEvents();
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

      {showAlert === "成功刪除!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能刪除，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
