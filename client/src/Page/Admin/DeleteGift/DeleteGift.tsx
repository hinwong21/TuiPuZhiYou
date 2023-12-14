import React, { useEffect, useState } from "react";
import { Gift } from "../../User/Gift/Gift";
import { api_origin } from "../../../service/api";

export const DeleteGift = () => {
  //Get all gifts
  const handleGetGiftDetails = async () => {
    const res = await fetch(`${api_origin}/user/`, {
      method: "GET",
    });
    const json = await res.json();
    console.log(json);
  };

  useEffect(() => {
    handleGetGiftDetails();
  }, []);

  return (
    <>
      <div className="userGiftHeader">刪除禮物</div>
      <div className="giftBoardContainer">
        <div className="giftBoard">
          <Gift
            giftID="1"
            details="5kg金象米, 換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="2"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="3"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="4"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="5"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="6"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="7"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="8"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="9"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="10"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="11"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="12"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
          <Gift
            giftID="13"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="刪除"
          />
        </div>
      </div>
    </>
  );
};
