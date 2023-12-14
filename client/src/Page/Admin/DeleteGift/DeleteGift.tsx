import React, { useEffect, useState } from "react";
import { Gift } from "../../User/Gift/Gift";
import { api_origin } from "../../../service/api";

export const DeleteGift = () => {
  //Get all gifts
  const handleGetGiftDetails = async () => {
    const res = await fetch(`${api_origin}/gift/`, {
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
          {/* <Gift
            giftID="12"
            details="5kg金象米, 換領地點"
            point={50}
            btnName="刪除"
          /> */}
        </div>
      </div>
    </>
  );
};
