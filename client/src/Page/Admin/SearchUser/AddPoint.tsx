import React, { useState } from "react";
import "./AddPoint.css";
import { Input } from "../../../Component/Input/Input";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../service/api";
import { BackBtn } from "../../../Component/BackBtn/BackBtn";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";

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
  const [showAlert, setShowAlert] = useState("");

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
      setShowAlert("未輸入積分或廚餘!");
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
        setShowAlert("添加成功!");
      } else {
        setShowAlert("未能添加!");
      }

      goBack();
    }
  };

  return (
    <>
      <div className="addPointContainer">
        <BackBtn goBack={goBack} />

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

        <ConfirmButton
          btnName="確認"
          type={"button"}
          onClick={handleConfirmBtn}
        />
      </div>

      {showAlert === "未輸入積分或廚餘!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能添加!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "添加成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
