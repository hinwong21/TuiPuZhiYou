import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface EventProps {
  eventID: string;
  name: string;
  details: string;
  participant: number;
  participantCount: string;
  image: string;
  btnCall: string;
  onClick?: any;
}

export const Events: React.FC<EventProps> = ({
  eventID,
  name,
  details,
  participant,
  participantCount,
  image,
  btnCall,
  onClick,
}) => {
  const [isDetailEmpty, setIsDetailEmpty] = useState<Boolean>(true);
  const [imageStyle, setImageStyle] = useState("styleOne");

  const handleChangeImageStyle = () => {
    if (imageStyle === "styleOne") {
      setImageStyle("styleTwo");
    } else if (imageStyle === "styleTwo") {
      setImageStyle("styleThree");
    } else {
      setImageStyle("styleOne");
    }
  };

  useEffect(() => {
    if (details !== "") {
      setIsDetailEmpty(false);
    }
  }, [details]);

  return (
    <div className="eventContainer" id={eventID}>
      <div className="eventBox">
        <div className="eventName">{name}</div>
        <div className="eventImageBox" onClick={handleChangeImageStyle}>
          <img
            src={image}
            alt="eventPoster"
            className={
              imageStyle === "styleOne"
                ? "eventImageStyleOne"
                : imageStyle === "styleTwo"
                ? "eventImageStyleTwo"
                : "eventImageStyleThree"
            }
          />
        </div>

        {isDetailEmpty ? (
          <div className="eventDescription">活動內容：詳情看海報</div>
        ) : (
          <div className="eventDropdownContainer">
            <Dropdown details={`活動內容： ${details}`} />
          </div>
        )}
      </div>
      {parseInt(participantCount) === participant ? (
        <div className="btnBox">
          <div className="btnBoxEventFulled">活動人數已滿</div>
        </div>
      ) : (
        <div className="btnBox">
          <ConfirmButton type="button" btnName={btnCall} onClick={onClick} />
        </div>
      )}
    </div>
  );
};
