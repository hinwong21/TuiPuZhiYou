import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface EventProps {
  details: string;
  image: string;
  btnCall: string;
}

export const Events: React.FC<EventProps> = ({ details, image, btnCall }) => {
  const [isDetailEmpty, setIsDetailEmpty] = useState<Boolean>(true);

  useEffect(() => {
    if (details !== "") {
      setIsDetailEmpty(false);
    }
  }, [details]);
  return (
    <div className="eventContainer">
      <div className="eventBox">
        <div className="eventImageBox">
          <img src={image} alt="" className="eventImage" />
        </div>

        {isDetailEmpty ? (
          <div className="eventDescription">活動內容：詳情看海報</div>
        ) : (
          <div className="eventDropdownContainer">
            <Dropdown details={`活動內容：${details}`} />
          </div>
        )}
      </div>
      <div className="btnBox">
        <ConfirmButton type="button" btnName={btnCall} />
      </div>
    </div>
  );
};
