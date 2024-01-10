import React, { useState } from "react";
import "./ChangePassword.css";
import { Input } from "../../../../Component/Input/Input";
import { Select } from "../../../../Interaction/Select/Select";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";
import { adminOptions } from "../../../../service/projectOption";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface ChangePasswordProps {
  goBack: () => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({ goBack }) => {
  const [adminName, setAdminName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const handleAdminNameChange = (selectedOption: string) => {
    setAdminName(selectedOption);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleChangePasswordBtnClick = async () => {
    setShowAlert("loading");
    if (newPassword === confirmNewPassword) {
      const res = await fetch(`${api_origin}/account/admin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          adminName: adminName,
          password: confirmNewPassword,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowAlert("成功更改密碼!");
      } else {
        setShowAlert("未能更改密碼，請稍後再嘗試!");
      }
    } else {
      setShowAlert("新密碼不相符!");
    }
  };

  return (
    <>
      <div className="editGiftContainer">
        <SubPageHeader title="更改管理員密碼" goBack={goBack} />

        <div className="changePasswordContainer">
          <Select
            title="用戶名稱"
            options={adminOptions}
            selectedOption={adminName}
            onSelectOption={handleAdminNameChange}
          />

          <Input
            title="新密碼"
            type="text"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />

          <Input
            title="再次確認新密碼"
            type="text"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />

          <ConfirmButton
            btnName="確認"
            onClick={handleChangePasswordBtnClick}
          />
        </div>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
      {showAlert === "成功更改密碼!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能更改密碼，請稍後再嘗試!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "新密碼不相符!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
