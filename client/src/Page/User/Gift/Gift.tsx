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
  amount: number;
  btnName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  view?: string;
}

export const Gift: React.FC<GiftProps> = ({
  giftID,
  image,
  name,
  details,
  point,
  amount,
  btnName,
  onClick,
  view,
}) => {
  const [nameStyle, setNameStyle] = useState("styleOne");
  const [imageStyle, setImageStyle] = useState("styleOne");
  const exchangePoint = typeof point === "string" ? parseInt(point) : point;
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleChangeNameStyle = () => {
    if (nameStyle === "styleOne") {
      setNameStyle("styleTwo");
    } else {
      setNameStyle("styleOne");
    }
  };

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSize({ width, height });
  };

  const handleChangeImageStyle = () => {
    if (imageStyle === "styleOne" && imageSize.width > imageSize.height) {
      setImageStyle("styleTwo");
    } else if (
      imageStyle === "styleOne" &&
      imageSize.width <= imageSize.height
    ) {
      setImageStyle("styleThree");
    } else if (imageStyle !== "styleOne") {
      setImageStyle("styleOne");
    }
  };

  return (
    <div className="giftBoardGiftContainer" id={giftID}>
      <div
        onClick={handleChangeNameStyle}
        className={
          nameStyle === "styleOne"
            ? "giftBoardGiftNameStyleOne"
            : "giftBoardGiftNameStyleTwo"
        }
      >
        {name}
      </div>
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
          onLoad={handleImageLoad}
        />
      </div>
      <div className="giftBoardGiftExchangePoints">{`需換領分數：${exchangePoint} 分`}</div>
      <div className="giftBoardGiftExchangePoints">{`剩餘數量：${amount}`}</div>
      <div className="giftDropdownContainer">
        <Dropdown details={`禮物內容: ${details}`} />
      </div>

      {amount === 0 && view === "user" ? (
        <div className="giftCantExchangeBtn">
          <div>換罄</div>
        </div>
      ) : (
        <ConfirmButton type="button" btnName={btnName} onClick={onClick} />
      )}
    </div>
  );
};
