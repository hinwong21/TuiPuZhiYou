import React from "react";
import "./UserGift.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";

interface GiftProps {
  details: string;
  point: number;
}

export const Gift: React.FC<GiftProps> = ({ details, point }) => {
  return (
    <div className="giftBoardGiftContainer">
      <img src="#" alt="" className="giftBoardGiftImage" />
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${point} 分`}</div>
      <div className="giftBoardGiftExchangePosition">{details}</div>
      <ConfirmButton type="button" btnName="換領" />
    </div>
  );
};
