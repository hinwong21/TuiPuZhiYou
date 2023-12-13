import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../service/api";

export const UserInfo = () => {
  const [totalPoint, setTotalPoint] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);

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
      setTotalWaste(json.result[0].total_weight);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);
  return (
    <div className="userInfoContainer">
      <div className="userInfoGap"></div>
      <div className="userInfoProjectHeader">三無大廈環保回收你我出力 </div>
      <div className="userInfoProjectSubHeader">（廚餘回收）</div>
      <div className="userInfoPoints">我的積分： {totalPoint} 分</div>
      <div className="userInfoWasteRecord">本月廚餘： 0.00 公斤</div>
      <div className="userInfoWasteRecord">總累積廚餘： {totalWaste} 公斤</div>

      <div className="userInfoGap"></div>
      <ConfirmButton btnName="換領禮物詳情" type={"button"} />
      <div className="userInfoGap"></div>
      <ConfirmButton btnName="活動報名詳情" type={"button"} />
      <div className="userInfoGap"></div>
    </div>
  );
};
