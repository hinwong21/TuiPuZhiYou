import React from "react";
import { Input } from "../../Component/Input/Input";
// import { Dropdown } from "../../Interaction/Dropdown/Dropdown/Dropdown";
import "./Register.css";
import { Dropdown } from "../../Interaction/Dropdown/Dropdown/Dropdown";

export const Register = () => {
  return (
    <>
      <h4>注册帳戶</h4>
      <Input title="用戶名稱" type="text" />
      <Input title="電話號碼或電郵地址" type="text" />
      <Input title="確認電話號碼或電郵地址" type="text" />

      <Input title="密碼" type="password" />
      <Input title="確認密碼" type="password" />

      <div className="registerAddressTitle">地址</div>

      <Dropdown title="街" />
      <Dropdown title="號" />
      <Dropdown title="樓層" />
      <Input title="單位" type="text" />
    </>
  );
};
