import React, { useEffect, useState } from "react";
import "./UserGift.css";
import { Gift } from "./Gift";
import { api_origin } from "../../../service/api";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../Component/AlertBox/AlertYesNoBox";

interface GiftItem {
  giftID: string;
  name: string;
  details: string;
  point: number;
  image: string;
}

export const UserGift = () => {
  const [showAlert, setShowAlert] = useState("");
  const [totalPoint, setTotalPoint] = useState(0);
  const [gifts, setGifts] = useState<GiftItem[] | null>(null);
  const [getEXGiftID, setGetEXGiftID] = useState("");
  const [getEXGiftPoint, setGetEXGiftPoint] = useState("");

  const handleGetUserDetails = async () => {
    const userId = localStorage.getItem("ef2023_user_id");
    const res = await fetch(`${api_origin}/account/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const json = await res.json();

    if (json.result && json.result.length > 0) {
      const point = parseInt(json.result[0].total_point);
      setTotalPoint(point);
    }
  };

  //Get all gifts
  const handleGetAllGifts = async () => {
    const res = await fetch(`${api_origin}/gift/`, {
      method: "GET",
    });
    const json = await res.json();
    const filteredGifts = json.filter((gift: any) => gift.isDeleted === false);
    setGifts(filteredGifts);
  };

  const handleExchangeGift = async (
    point: string,
    giftId: string,
    CheckIsConfirmYes?: string
  ) => {
    await setShowAlert("");
    setGetEXGiftPoint(point);
    setGetEXGiftID(giftId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認換領？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

    const exchangePoint = parseInt(point);
    if (totalPoint < exchangePoint) {
      setShowAlert("積分不足以換領禮物!");
      return;
    }

    const userId = localStorage.getItem("ef2023_user_id");
    const project = "推普之友";
    const res = await fetch(`${api_origin}/record/gift`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        exchangePoint: exchangePoint,
        giftId: giftId,
        userId: userId,
        project: project,
      }),
    });
    const json = await res.json();

    if (json.success) {
      const updatedTotalPoint = parseInt(json.result.point);
      setGetEXGiftID(json.result.exGiftID);
      setTotalPoint(updatedTotalPoint);
      setShowAlert("換領禮物成功!");
    } else {
      setShowAlert("未能換領禮物，請稍後再嘗試!");
    }
  };

  useEffect(() => {
    handleGetUserDetails();
    handleGetAllGifts();
  }, []);

  return (
    <>
      <div className="userGiftHeader">換領禮物</div>
      <div className="userGiftUserPoint">可換領積分：{totalPoint} 分</div>

      <div className="giftBoardContainer">
        <div className="giftBoard">
          {gifts?.map((gift: any) => (
            <Gift
              key={gift.gift_id}
              giftID={gift.gift_id}
              image={gift.gift_image}
              name={gift.gift_name}
              details={gift.gift_detail}
              point={gift.exchange_point}
              onClick={() =>
                handleExchangeGift(gift.exchange_point, gift.gift_id, "")
              }
              btnName="換領"
            />
          ))}
        </div>
      </div>

      {showAlert === "是否確認換領？" && (
        <AlertYesNoBox
          header={showAlert}
          btnNameOne={{
            btnName: "是",
            onClick: () => handleExchangeGift(getEXGiftPoint, getEXGiftID),
          }}
          btnNameTwo={{
            btnName: "否",
            onClick: () =>
              handleExchangeGift(getEXGiftPoint, getEXGiftID, "false"),
          }}
        />
      )}
      {showAlert === "積分不足以換領禮物!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "換領禮物成功!" && (
        <AlertConBox
          header={
            <div>
              換領禮物成功! <br />
              禮物換領號: EX- {getEXGiftID} <br />
              詳情可在
              <br />
              我的資料-換領禮物詳情查看
            </div>
          }
          btnName={"確認"}
        />
      )}
      {showAlert === "未能換領禮物，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
