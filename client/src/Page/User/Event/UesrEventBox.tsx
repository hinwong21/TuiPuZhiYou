import React, { useEffect, useState } from "react";
import "./UserEvent.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";

interface EventProps {
  details: string;
  image: string;
}

export const Events: React.FC<EventProps> = ({ details, image }) => {
  const [showDetails, setShowDetails] = useState<Boolean>(true);

  useEffect(() => {
    if (details === "") {
      setShowDetails(false);
    }
  }, [details]);
  return (
    <div className="eventContainer">
      <div className="eventBox">
        <div className="eventImageBox">
          <img src={image} alt="" className="eventImage" />
        </div>

        <div className="eventDetailsBox">
          {showDetails ? (
            <div className="eventDetails">{`活動內容：${details}`}</div>
          ) : (
            <div className="eventDetails">活動內容：詳情看海報</div>
          )}
        </div>
      </div>
      <div className="btnBox">
        <ConfirmButton type="button" btnName="參加" />
      </div>
    </div>
  );
};
