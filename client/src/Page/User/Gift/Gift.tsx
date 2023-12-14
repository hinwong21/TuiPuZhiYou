import React from "react";
import "./UserGift.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface GiftProps {
  giftID: string;
  details: string;
  point: number;
  btnCall: string;
}

export const Gift: React.FC<GiftProps> = ({ details, point, btnCall }) => {
  return (
    <div className="giftBoardGiftContainer">
      <img src="#" alt="" className="giftBoardGiftImage" />
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${point} 分`}</div>
      <div className="giftDropdownContainer">
        <Dropdown details={details} />
      </div>
      <ConfirmButton type="button" btnName={btnCall} />
    </div>
  );
};
