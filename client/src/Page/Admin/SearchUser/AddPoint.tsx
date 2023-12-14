import React, { useState } from "react";
import "./AddPoint.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../../Component/Input/Input";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../service/api";

interface UserDetail {
  user_id: number;
  street: string;
  number: string;
  floor: string;
  unit: string;
  username: string;
}

interface AddPointProps {
  userDetail: UserDetail;
  goBack: () => void;
}

export const AddPoint: React.FC<AddPointProps> = ({ userDetail, goBack }) => {
  const [wasteWeight, setWasteWeight] = useState<string>("");
  const [point, setPoint] = useState<string>("");

  const handleWasteWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWasteWeight(event.target.value);
  };

  const handlePointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(event.target.value);
  };

  const handleConfirmBtn = async () => {
    if (wasteWeight === "" || point === "") {
      alert("未輸入積分或廚餘");
      return;
    }

    if (parseFloat(point) && parseFloat(wasteWeight)) {
      const res = await fetch(`${api_origin}/record/point`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userDetail.user_id,
          point: parseFloat(point),
          weight: parseFloat(wasteWeight),
        }),
      });
      const json = await res.json();
      if (json.success) {
        alert("添加成功");
      } else {
        alert("未能添加");
      }

      goBack();
    }
  };

  return (
    <div className="addPointContainer">
      <div onClick={goBack} className="addPointBackBtnContainer">
        <FontAwesomeIcon icon={faArrowLeft} className="addPointBackBtn" />
      </div>

      <div className="searchResultSession">
        <div className="searchResultSessionHeader">地址：</div>
        <div>
          {userDetail.street} {userDetail.number}號 {userDetail.floor}樓{" "}
          {userDetail.unit}
        </div>
      </div>

      <div className="searchResultSession">
        <div className="searchResultSessionHeader">用戶：</div>
        <div>{userDetail.username}</div>
      </div>

      <div className="addPointAndWasteRecordHeader">紀錄積分和廚餘</div>

      <Input
        title="廚餘重量"
        type="text"
        value={wasteWeight}
        onChange={handleWasteWeightChange}
      />
      <Input
        title="添加積分"
        type="text"
        value={point}
        onChange={handlePointChange}
      />

      <div onClick={handleConfirmBtn}>
        <ConfirmButton btnName="確認" type={"button"} />
      </div>
    </div>
  );
};
