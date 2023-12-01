import React, { useState } from "react";
import { Input } from "../../Component/Input/Input";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";
import "./Login.css";

interface LoginProps {
  onStatusChange: (newStatus: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onStatusChange }) => {
  const handleStatus = (newStatus: string) => {
    onStatusChange(newStatus);
  };

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <h2>登入</h2>
      {/* Login form */}
      <form>
        {/* Input fields for username and password */}
        <Input title="電話號碼或電郵" type="text" />
        <Input title="密碼" type="text" />
        {/* Button to submit the login form */}
        <div className="container-confirmButton">
          <ConfirmButton type="submit" btnName="登入" />
        </div>
      </form>

      <div className="rememberMe">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label>記住帳號密碼</label>
      </div>

      {/* Register button */}
      <div className="register-link">
        <p>
          沒有帳戶？{" "}
          <span
            style={{ color: "green", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => {
              handleStatus("register");
            }}
          >
            立即註冊！
          </span>
        </p>
      </div>
    </>
  );
};
