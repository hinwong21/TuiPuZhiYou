import React, { useEffect, useState } from "react";
import { Input } from "../../Component/Input/Input";
import "./Register.css";
import { Dropdown } from "../../Interaction/Dropdown/Dropdown/Dropdown";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";

export const Register = () => {
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

  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloor(event.target.value);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
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
        title="確認電話號碼或電郵地址"
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
        title="確認密碼"
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
      <Input
        title="樓層"
        type="text"
        value={floor}
        onChange={handleFloorChange}
      />
      <Input
        title="單位"
        type="text"
        value={unit}
        onChange={handleUnitChange}
      />

      <ConfirmButton btnName="確認" />

      <div className="registerGap"></div>
    </>
  );
};
