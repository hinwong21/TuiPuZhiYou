import React, { useEffect, useState } from "react";
import { Input } from "../../Component/Input/Input";
import { ConfirmButton } from "../../Component/ConfirmButton/ConfirmButton";
import "./Login.css";
import { api_origin } from "../../service/api";
import { handleKeyPress } from "../../service/useKeyPress";
import { AlertConBox } from "../../Component/AlertBox/AlertConBox";
import { AlertLoadingBox } from "../../Component/AlertBox/AlertLoadingBox";
import { ProjectTitle } from "../../Component/ProjectTitle";

interface LoginProps {
  onStatusChange: (newStatus: string) => void;
  username: string;
}

export const Login: React.FC<LoginProps> = ({ onStatusChange, username }) => {
  const [phoneNumOrEmail, setPhoneNumOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlert, setShowAlert] = useState("");

  const handlePhoneNumOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleStatus = React.useCallback(
    (newStatus: string) => {
      onStatusChange(newStatus);
      window.scrollTo(0, 0);
    },
    [onStatusChange]
  );

  const handleLoginBtnClick = async () => {
    setShowAlert("loading");
    const projectId = "新界北義工團";

    const res = await fetch(`${api_origin}/account/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumOrEmail: phoneNumOrEmail,
        password: password,
        projectId: projectId,
      }),
    });
    const json = await res.json();

    // if clicked remember me, saved to localStorage; else remove
    const rememberMeStatus = rememberMe.toString();
    if (rememberMe) {
      localStorage.setItem("ef2023_rememberMe", rememberMeStatus);
      localStorage.setItem("ef2023_phoneNumOrEmail", phoneNumOrEmail);
      localStorage.setItem("ef2023_password", password);
    } else {
      localStorage.removeItem("ef2023_rememberMe");
      localStorage.removeItem("ef2023_phoneNumOrEmail");
      localStorage.removeItem("ef2023_password");
    }

    if (json.result.success === false) {
      setShowAlert("電話號碼或電郵或密碼錯誤！");
    } else {
      localStorage.setItem("ef2023_user_id", json.result.result.user_id);
      if (json.result.result.isVolunteer === true) {
        localStorage.setItem("ef2023_isVolunteer", "true");
      } else {
        localStorage.setItem("ef2023_isVolunteer", "false");
      }

      if (json.result.result.isAdmin === true) {
        localStorage.setItem("ef2023_isAdmin", "true");
      }

      if (json.result.result.isManager === true) {
        localStorage.setItem("ef2023_isManager", "true");
      }

      window.location.href = "/";
    }
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
    // if logged in, direct to info
    const isVolunteer = localStorage.getItem("ef2023_isVolunteer");

    if (username !== "") {
      if (isVolunteer === "false") {
        handleStatus("userInfo");
      } else {
        handleStatus("searchUser");
      }
    }
  }, [handleStatus, username]);

  useEffect(() => {
    handleInputStatus();
  }, []);

  return (
    <>
      <div className="loginContainer">
        <div className="userInfoGap"></div>
        <ProjectTitle />

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
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyPress(e, "Enter", handleLoginBtnClick)
          }
        />

        <div className="rememberMe">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            onKeyDown={(e) => handleKeyPress(e, "Enter", handleLoginBtnClick)}
          />
          <label>記住帳號密碼</label>
        </div>

        {/* Button to submit the login form */}
        <ConfirmButton
          type="submit"
          btnName="登入"
          onClick={handleLoginBtnClick}
        />

        {/* Register button */}
        <div className="register-link">
          <p>
            沒有帳戶？{" "}
            <span
              className="loginRegisterBtn"
              onClick={() => {
                handleStatus("register");
              }}
            >
              立即註冊！
            </span>
          </p>
        </div>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
      {showAlert === "電話號碼或電郵或密碼錯誤！" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
