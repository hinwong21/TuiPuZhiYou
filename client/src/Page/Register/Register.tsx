import React from "react";
import { Input } from "../../Component/Input/Input";

export const Register = () => {
  return (
    <>
      <div>Register</div>
      <Input title="用戶名稱" type="text" />
      <Input title="電話號碼或電郵地址" type="text" />
    </>
  );
};