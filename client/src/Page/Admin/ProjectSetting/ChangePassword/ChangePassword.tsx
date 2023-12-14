import React, { useState } from "react";
import "./ChangePassword.css";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";
import { Input } from "../../../../Component/Input/Input";
import { Select } from "../../../../Interaction/Select/Select";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";

interface ChangePasswordProps {
  goBack: () => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({ goBack }) => {
  const [adminName, setAdminName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const adminOptions: string[] = [
    "---請選擇---",
    "manager",
    "volunteer_tpzy01",
    "volunteer_tpzy02",
    "volunteer_ndvg01",
    "volunteer_ndvg02",
    "volunteer_hksun01",
    "volunteer_hksun02",
    "volunteer_sumyee01",
    "volunteer_sumyee02",
    "admin_tpzy",
    "admin_ndvg",
    "admin_hksun",
    "admin_sumyee",
  ];

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
        alert("成功更改密碼");
      } else {
        alert("未能更改密碼，請稍後再嘗試");
      }
    } else {
      alert("新密碼不相符");
    }
  };

  return (
    <div className="editGiftContainer">
      <BackBtn goBack={goBack} />
      <header className="editGiftHeader">更改管理員密碼</header>

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

        <ConfirmButton btnName="確認" onClick={handleChangePasswordBtnClick} />
      </div>
    </div>
  );
};
