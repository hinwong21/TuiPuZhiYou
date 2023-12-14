import React, { useEffect, useState } from "react";
import { Events } from "../../../User/Event/UserEventBox";
import { api_origin } from "../../../../service/api";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";

interface EventItem {
  eventId: string;
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
      alert("成功刪除");
      handleGetAllEvents();
    } else {
      alert("未能刪除，請稍後再嘗試");
    }
  };

  useEffect(() => {
    handleGetAllEvents();
  }, []);

  return (
    <div className="changePasswordContainer">
      <BackBtn goBack={goBack} />
      <div className="userEventHeader">刪除活動</div>

      <div className="eventBoardContainer">
        {events?.map((event: any) => (
          <Events
            key={event.event_id}
            eventID={event.event_id}
            image={event.event_image}
            details={event.event_detail}
            btnCall="刪除"
            onClick={() => handleDeleteEvent(event.event_id)}
          />
        ))}
      </div>
    </div>
  );
};
