import React, { useEffect, useState } from "react";
import { Input } from "../../Component/Input/Input";
import "./Register.css";
import { Dropdown } from "../../Interaction/Dropdown/Dropdown/Dropdown";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../service/api";

interface RegisterProps {
  onStatusChange: (newStatus: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onStatusChange }) => {
  const [username, setUsername] = useState<string>("");
  const [phoneNumOrEmail, setPhoneNumOrEmail] = useState<string>("");
  const [confirmPhoneNumOrEmail, setConfirmPhoneNumOrEmail] =
    useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  const streetOptions: string[] = [
    "---請選擇---",
    "同發坊",
    "同秀坊",
    "同茂坊",
  ];

  const numberOptions: string[] = [
    "---請選擇---",
    "1-3",
    "2-4",
    "5-7",
    "6-8",
    "9-11",
    "10-12",
    "13-15",
    "14-16",
  ];

  const floorOptions: string[] = [
    "---請選擇---",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "閣樓",
    "天台",
  ];

  const handleStatus = (newStatus: string) => {
    onStatusChange(newStatus);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePhoneNumOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumOrEmail(event.target.value);
  };

  const handleConfirmPhoneNumOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPhoneNumOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleStreetChange = (selectedOption: string) => {
    setStreet(selectedOption);
  };

  const handleNumberChange = (selectedOption: string) => {
    setNumber(selectedOption);
  };

  const handleFloorChange = (selectedOption: string) => {
    setFloor(selectedOption);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handleBackBtnClick = () => {
    handleStatus("login");
  };

  const handleRegisterBtnClick = async () => {
    if (username === "") {
      alert("請填寫用戶名稱！");
      return;
    }

    if (phoneNumOrEmail !== confirmPhoneNumOrEmail) {
      alert("確認電話號碼或電郵地址不相符");
      setConfirmPhoneNumOrEmail("");
      return;
    }

    if (password !== confirmPassword) {
      alert("確認密碼不相符");
      setConfirmPassword("");
      return;
    }

    if (
      street === "---請選擇---" ||
      number === "---請選擇---" ||
      floor === "---請選擇---" ||
      unit === ""
    ) {
      alert("請填寫完整地址");
      return;
    }

    // const projectId = window.location.hostname;

    // not deploy yet, hard code first
    const projectId = "P001";

    const res = await fetch(`${api_origin}/account/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        emailOrPhoneNum: confirmPhoneNumOrEmail,
        password: confirmPassword,
        street: street,
        number: number,
        floor: floor,
        unit: unit,
        project_id: projectId,
      }),
    });

    const json = await res.json();

    // redirect to userInfo page
    if (json.success === true) {
      alert("成功注册");
      localStorage.setItem("ef2023_user_id", json.user_id);
      localStorage.setItem("ef2023_isAdmin", "false");
      window.location.href = "/";
    } else {
      alert("未能注册成功");
    }
  };

  useEffect(() => {
    setPassword(confirmPhoneNumOrEmail);
  }, [confirmPhoneNumOrEmail]);

  return (
    <>
      <h4>注册帳戶</h4>
      <Input
        title="用戶名稱"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        title="電話號碼或電郵地址"
        type="text"
        value={phoneNumOrEmail}
        onChange={handlePhoneNumOrEmailChange}
      />
      <Input
        title="確認您的電話號碼或電郵地址"
        type="text"
        value={confirmPhoneNumOrEmail}
        onChange={handleConfirmPhoneNumOrEmailChange}
      />

      <Input
        title="密碼"
        type="text"
        value={password}
        onChange={handlePasswordChange}
        component={
          <div className="registerDefaultNotice">
            *密碼默認為電話號碼或電郵地址
          </div>
        }
      />

      <Input
        title="確認您的密碼"
        type="text"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <div className="registerAddressTitle">地址</div>

      <Dropdown
        title="街"
        options={streetOptions}
        selectedOption={street}
        onSelectOption={handleStreetChange}
      />
      <Dropdown
        title="號"
        options={numberOptions}
        selectedOption={number}
        onSelectOption={handleNumberChange}
      />
      <Dropdown
        title="樓層"
        options={floorOptions}
        selectedOption={floor}
        onSelectOption={handleFloorChange}
      />
      <Input
        title="單位"
        type="text"
        value={unit}
        onChange={handleUnitChange}
      />

      <div className="registerBtnContainer">
        <div onClick={handleBackBtnClick}>
          <ConfirmButton btnName="返回" />
        </div>
        <div onClick={handleRegisterBtnClick}>
          <ConfirmButton btnName="注册" />
        </div>
      </div>

      <div className="registerGap"></div>
    </>
  );
};
