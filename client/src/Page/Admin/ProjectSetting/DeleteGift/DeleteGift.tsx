import React, { useEffect, useState } from "react";
import { Gift } from "../../../User/Gift/Gift";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";

interface GiftItem {
  giftID: string;
  details: string;
  point: number;
  btnCall: string;
}

interface DeleteGiftProps {
  goBack: () => void;
}

export const DeleteGift: React.FC<DeleteGiftProps> = ({ goBack }) => {
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
    const res = await fetch(`${api_origin}/gift/delete`, {
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
      handleGetAllGifts();
    } else {
      alert("未能刪除禮物");
    }
  };

  useEffect(() => {
    handleGetAllGifts();
  }, []);

  return (
    <div className="changePasswordContainer">
      <SubPageHeader title="刪除禮物" goBack={goBack} />
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
    </div>
  );
};
