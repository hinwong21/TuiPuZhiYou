import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface EventProps {
  eventID: string;
  name: string;
  details: string;
  image: string;
  btnCall: string;
  onClick?: any;
}

export const Events: React.FC<EventProps> = ({
  eventID,
  name,
  details,
  image,
  btnCall,
  onClick,
}) => {
  const [isDetailEmpty, setIsDetailEmpty] = useState<Boolean>(true);

  useEffect(() => {
    if (details !== "") {
      setIsDetailEmpty(false);
    }
  }, [details]);

  return (
    <div className="eventContainer" id={eventID}>
      <div className="eventBox">
        <div className="eventName">{name}</div>
        <div className="eventImageBox">
          <img src={image} alt="eventPoster" className="eventImage" />
        </div>

        {isDetailEmpty ? (
          <div className="eventDescription">活動內容：詳情看海報</div>
        ) : (
          <div className="eventDropdownContainer">
            <Dropdown details={`活動內容： ${details}`} />
          </div>
        )}
      </div>
      <div className="btnBox">
        <ConfirmButton type="button" btnName={btnCall} onClick={onClick} />
      </div>
    </div>
  );
};
