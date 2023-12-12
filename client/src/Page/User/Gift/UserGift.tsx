import React, { useEffect, useState } from "react";
import "./UserGift.css";
import { Gift } from "./Gift";
import { api_origin } from "../../../service/api";

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

  return (
    <>
      <div className="userGiftHeader">換領禮物</div>
      <div className="userGiftUserPoint">可換領積分：{totalPoint} 分</div>

      <div className="giftBoardContainer">
        <div className="giftBoard">
          <Gift title="5kg金象米" position="換領地點" point={50} />
          <Gift title="5kg金象米" position="換領地點" point={50} />
          <Gift title="5kg金象米" position="換領地點" point={50} />
          <Gift title="5kg金象米" position="換領地點" point={50} />
        </div>
      </div>
    </>
  );
};
