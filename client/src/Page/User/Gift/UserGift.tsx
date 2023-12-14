import React, { useEffect, useState } from "react";
import "./UserGift.css";
import { Gift } from "./Gift";
import { api_origin } from "../../../service/api";
import { json } from "stream/consumers";

export const UserGift = () => {
  const [totalPoint, setTotalPoint] = useState(0);

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

  useEffect(() => {
    handleGetUserDetails();
  }, []);

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
      <div className="userGiftHeader">換領禮物</div>
      <div className="userGiftUserPoint">可換領積分：{totalPoint} 分</div>

      <div className="giftBoardContainer">
        <div className="giftBoard">
          <Gift
            giftID="1"
            details="5kg金象米, 換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="2"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="3"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="4"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="5"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="6"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="7"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="8"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="9"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="10"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="11"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="12"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
          <Gift
            giftID="13"
            details="5kg金象米, 換領地點"
            point={50}
            btnCall="換領"
          />
        </div>
      </div>
    </>
  );
};
