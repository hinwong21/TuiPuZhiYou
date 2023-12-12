import React, { useEffect, useState } from "react";
import { Input } from "../../Component/Input/Input";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";
import "./Login.css";
import { api_origin } from "../../service/api";

interface LoginProps {
  onStatusChange: (newStatus: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onStatusChange }) => {
  const [phoneNumOrEmail, setPhoneNumOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handlePhoneNumOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleStatus = (newStatus: string) => {
    onStatusChange(newStatus);
  };

  const handleLoginBtnClick = async () => {
    const res = await fetch(`${api_origin}/account/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumOrEmail: phoneNumOrEmail,
        password: password,
      }),
    });
    const json = await res.json();

    if (json.result.success === false) {
      alert("電話號碼或電郵或密碼錯誤！");
    } else {
      alert("成功登入");
    }

    localStorage.setItem("ef2023_user_id", json.result.result.user_id);

    const rememberMeStatus = rememberMe.toString();

    // if clicked remember me, saved to localStorage; else remove
    if (rememberMe) {
      localStorage.setItem("ef2023_rememberMe", rememberMeStatus);
      localStorage.setItem("ef2023_phoneNumOrEmail", phoneNumOrEmail);
      localStorage.setItem("ef2023_password", password);
    } else {
      localStorage.removeItem("ef2023_rememberMe");
      localStorage.removeItem("ef2023_phoneNumOrEmail");
      localStorage.removeItem("ef2023_password");
    }

    // temporary
    onStatusChange("Register");
  };

  const handleInputStatus = () => {
    const rememberMeStatus = Boolean(localStorage.getItem("ef2023_rememberMe"));
    setRememberMe(rememberMeStatus);

    // if localStorage exist, insert it
    const savedPhoneNumOrEmail = localStorage.getItem("ef2023_phoneNumOrEmail");
    if (typeof savedPhoneNumOrEmail == "string") {
      setPhoneNumOrEmail(savedPhoneNumOrEmail!);
    }

    // if localStorage exist, insert it
    const savedPassword = localStorage.getItem("ef2023_password");
    if (typeof savedPassword == "string") {
      setPassword(savedPassword!);
    }
  };

  useEffect(() => {
    handleInputStatus();
  }, []);

  return (
    <>
      <h2>登入</h2>

      {/* Input fields for username and password */}
      <Input
        title="電話號碼或電郵"
        type="text"
        value={phoneNumOrEmail}
        onChange={handlePhoneNumOrEmailChange}
      />
      <Input
        title="密碼"
        type="text"
        value={password}
        onChange={handlePasswordChange}
      />

      <div className="rememberMe">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label>記住帳號密碼</label>
      </div>

      {/* Button to submit the login form */}
      <div className="container-confirmButton" onClick={handleLoginBtnClick}>
        <ConfirmButton type="submit" btnName="登入" />
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
