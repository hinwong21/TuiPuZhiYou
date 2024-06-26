import React, { useEffect, useState } from "react";
import { Input } from "../../Component/Input/Input";
import "./Register.css";
import { Select } from "../../Interaction/Select/Select";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../service/api";
import { handleKeyPress } from "../../service/useKeyPress";
import {
  ndvgStreetOptions,
  ndvgNumberOptions,
  floorOptions,
} from "../../service/projectOption";
import { AlertConBox } from "../../Component/AlertBox/AlertConBox";
import { InputTransUpper } from "../../Component/Input/InputTransform/InputTransUpper";
import { ProjectTitle } from "../../Component/ProjectTitle";

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
  const [street, setStreet] = useState<string>(ndvgStreetOptions[0]);
  const [number, setNumber] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [showAlert, setShowAlert] = useState("");

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
    window.scrollTo(0, 0);
    handleStatus("login");
  };

  const handleRegisterBtnClick = async () => {
    await setShowAlert("");

    if (username === "") {
      setShowAlert("請填寫用戶名稱！");
      return;
    }

    if (phoneNumOrEmail !== confirmPhoneNumOrEmail) {
      setShowAlert("確認電話號碼或電郵地址不相符!");
      setConfirmPhoneNumOrEmail("");
      return;
    }

    if (password !== confirmPassword) {
      setShowAlert("確認密碼不相符!");
      setConfirmPassword("");
      return;
    }

    if (
      street === "---請選擇---" ||
      number === "---請選擇---" ||
      floor === "---請選擇---" ||
      street === "" ||
      number === "" ||
      floor === "" ||
      unit === ""
    ) {
      setShowAlert("請填寫完整地址!");
      return;
    }

    const project = "新界北義工團";
    setShowAlert("loading");
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
        project_id: project,
      }),
    });

    const json = await res.json();

    // redirect to userInfo page
    if (json.success === true) {
      localStorage.setItem("ef2023_user_id", json.user_id);
      localStorage.setItem("ef2023_isVolunteer", "false");
      window.location.href = "/";
    } else {
      setShowAlert("未能注册成功!");
    }
  };

  useEffect(() => {
    setPassword(confirmPhoneNumOrEmail);
  }, [confirmPhoneNumOrEmail]);

  return (
    <>
      <div className="registerContainer">
        <div className="userInfoGap"></div>
        <ProjectTitle />

        <h2>注册帳戶</h2>
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

        <Select
          title="街"
          options={ndvgStreetOptions}
          selectedOption={street}
          onSelectOption={handleStreetChange}
        />
        <Select
          title="號"
          options={ndvgNumberOptions}
          selectedOption={number}
          onSelectOption={handleNumberChange}
        />
        <Select
          title="樓層"
          options={floorOptions}
          selectedOption={floor}
          onSelectOption={handleFloorChange}
        />
        <InputTransUpper
          title="單位"
          type="text"
          value={unit}
          onChange={handleUnitChange}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyPress(e, "Enter", handleRegisterBtnClick)
          }
        />

        <div className="registerBtnContainer">
          <ConfirmButton btnName="返回" onClick={handleBackBtnClick} />
          <ConfirmButton btnName="注册" onClick={handleRegisterBtnClick} />
        </div>

        <div className="registerGap"></div>
      </div>

      {showAlert === "請填寫用戶名稱！" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "確認電話號碼或電郵地址不相符!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "確認密碼不相符!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "請填寫完整地址!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "注册成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能注册成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
