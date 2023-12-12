import React from "react";
import "./UserGift.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";

interface GiftProps {
  title: string;
  position: string;
  point: number;
}

export const Gift: React.FC<GiftProps> = ({ title, position, point }) => {
  return (
    <div className="giftBoardGiftContainer">
      <img src="#" alt="" className="giftBoardGiftImage" />
      <header className="giftBoardGiftTitle">{title}</header>
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${point} 分`}</div>
      <div className="giftBoardGiftExchangePosition">{position}</div>
      <ConfirmButton type="button" btnName="換領" />
    </div>
  );
};
