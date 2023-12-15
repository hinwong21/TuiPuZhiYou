import React, { useEffect, useState } from "react";
import { Events } from "../../../User/Event/UserEventBox";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";

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

  const handleDeleteEvent = async (eventId: string) => {
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
              onClick={() => handleDeleteEvent(event.event_id)}
            />
          ))}
        </div>
      </div>

      {showAlert === "成功刪除!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能刪除，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
