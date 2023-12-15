import React from "react";
import "./UserGift.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface GiftProps {
  giftID: string;
  image: string;
  details: string;
  point: number;
  btnName: string;
  onClick: any;
}

export const Gift: React.FC<GiftProps> = ({
  giftID,
  image,
  details,
  point,
  btnName,
  onClick,
}) => {
  return (
    <div className="giftBoardGiftContainer" id={giftID}>
      <img src={image} alt="giftImage" className="giftBoardGiftImage" />
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${point} 分`}</div>
      <div className="giftDropdownContainer">
        <Dropdown details={`禮物內容: ${details}`} />
      </div>
      <ConfirmButton type="button" btnName={btnName} onClick={onClick} />
    </div>
  );
};
