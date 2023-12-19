import React, { useState } from "react";
import "./UserGift.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown";

interface GiftProps {
  giftID: string;
  image: string;
  name: string;
  details: string;
  point: number;
  btnName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Gift: React.FC<GiftProps> = ({
  giftID,
  image,
  name,
  details,
  point,
  btnName,
  onClick,
}) => {
  const [imageStyle, setImageStyle] = useState("styleOne");
  const exchangePoint = typeof point === "string" ? parseInt(point) : point;

  const handleChangeImageStyle = () => {
    if (imageStyle === "styleOne") {
      setImageStyle("styleTwo");
    } else if (imageStyle === "styleTwo") {
      setImageStyle("styleThree");
    } else {
      setImageStyle("styleOne");
    }
  };

  return (
    <div className="giftBoardGiftContainer" id={giftID}>
      <div className="giftBoardGiftName">{name}</div>
      <div
        className="giftBoardGiftImageContainer"
        onClick={handleChangeImageStyle}
      >
        <img
          src={image}
          alt="giftImage"
          className={
            imageStyle === "styleOne"
              ? "giftBoardGiftImageStyleOne"
              : imageStyle === "styleTwo"
              ? "giftBoardGiftImageStyleTwo"
              : "giftBoardGiftImageStyleThree"
          }
        />
      </div>
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${exchangePoint} 分`}</div>
      <div className="giftDropdownContainer">
        <Dropdown details={`禮物內容: ${details}`} />
      </div>
      <ConfirmButton type="button" btnName={btnName} onClick={onClick} />
    </div>
  );
};
