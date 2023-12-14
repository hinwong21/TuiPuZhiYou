import React, { useEffect, useState } from "react";
import { Gift } from "../../User/Gift/Gift";
import { api_origin } from "../../../service/api";

interface GiftItem {
  giftID: string;
  details: string;
  point: number;
  btnCall: string;
}

export const DeleteGift = () => {
  const [gifts, setGifts] = useState<GiftItem[] | null>(null);

  //Get all gifts
  const handleGetAllGifts = async () => {
    const res = await fetch(`${api_origin}/gift/`, {
      method: "GET",
    });
    const json = await res.json();
    const filteredGifts = json.filter((gift: any) => gift.isDeleted === false);
    setGifts(filteredGifts);
  };

  const handleDeleteGift = async (giftId: string) => {
    const res = await fetch(`${api_origin}/record/gift/delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        giftId: giftId,
      }),
    });
    const json = await res.json();
    if (json.success) {
      alert("成功刪除禮物");
    } else {
      alert("未能刪除禮物");
    }
  };

  useEffect(() => {
    handleGetAllGifts();
  }, []);

  return (
    <>
      <div className="userGiftHeader">刪除禮物</div>
      <div className="giftBoardContainer">
        <div className="giftBoard">
          {gifts?.map((gift: any) => (
            <Gift
              key={gift.gift_id}
              giftID={gift.gift_id}
              image={gift.gift_image}
              details={gift.gift_detail}
              point={gift.exchange_point}
              onClick={() => handleDeleteGift(gift.gift_id)}
              btnName="刪除"
            />
          ))}
        </div>
      </div>
    </>
  );
};
