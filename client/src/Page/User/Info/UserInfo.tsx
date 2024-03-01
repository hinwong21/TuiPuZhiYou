import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../service/api";
import { GiftDetail } from "./GiftDetail/GiftDetail";
// import { EventDetail } from "./EventDetail/EventDetail";
import { AlertLoadingBox } from "../../../Component/AlertBox/AlertLoadingBox";

export const UserInfo = () => {
  const [totalPoint, setTotalPoint] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);
  const [thisMonthWaste, setThisMonthWaste] = useState(0);
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const handleGetUserDetails = async () => {
    setShowAlert("loading");
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
    setShowAlert("");

    if (json.result && json.result.length > 0) {
      const point = parseInt(json.result[0].total_point);
      setTotalPoint(point);
      setTotalWaste(json.result[0].total_weight);
    }
  };

  const handleGetUserThisMonthWasteRecord = async () => {
    setShowAlert("loading");
    const userId = localStorage.getItem("ef2023_user_id");
    const res = await fetch(`${api_origin}/record/waste`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const json = await res.json();
    setShowAlert("");
    if (json.result && json.result.length > 0) {
      const currentMonth = new Date().getMonth() + 1;
      const thisMonthRecords = json.result.filter((record: any) => {
        const recordDate = new Date(record.date_add);
        return recordDate.getMonth() + 1 === currentMonth;
      });

      const totalWeightThisMonth = thisMonthRecords.reduce(
        (sum: number, record: any) => {
          return sum + parseFloat(record.weight);
        },
        0
      );

      // set this month waste and set number is formatted with two decimal places
      setThisMonthWaste(totalWeightThisMonth.toFixed(2));
    }
  };

  const handleUpdateStatus = (newString: string) => {
    setStatus(newString);
  };

  useEffect(() => {
    handleGetUserDetails();
    handleGetUserThisMonthWasteRecord();
  }, []);
  return (
    <>
      {status === "" && (
        <div className="userInfoContainer">
          <div className="userInfoGap"></div>
          <div className="projectHeader">三無大廈回收大行動</div>
          <div className="projectSubHeader">(廚餘回收)</div>
          <div className="userInfoPoints">我的積分： {totalPoint} 分</div>
          <div className="userInfoWasteRecord">
            本月廚餘： {thisMonthWaste} 公斤
          </div>
          <div className="userInfoWasteRecord">
            總累積廚餘： {totalWaste} 公斤
          </div>
          <div className="userInfoGap"></div>
          <ConfirmButton
            btnName="換領禮物詳情"
            type={"button"}
            onClick={() => {
              handleUpdateStatus("giftDetail");
            }}
          />
          {/* <ConfirmButton
            btnName="活動報名詳情"
            type={"button"}
            onClick={() => {
              handleUpdateStatus("eventDetail");
            }}
          /> */}
        </div>
      )}

      {status === "giftDetail" && (
        <GiftDetail goBack={() => handleUpdateStatus("")} />
      )}
      {/* {status === "eventDetail" && (
        <EventDetail goBack={() => handleUpdateStatus("")} />
      )} */}

      {showAlert === "loading" && <AlertLoadingBox />}
    </>
  );
};
