import React, { useEffect, useState } from "react";
import "./App.css";
import { TopBar } from "../src/Component/TopBar/TopBar";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";
import { api_origin } from "./service/api";
import { UserInfo } from "./Page/User/Info/UserInfo";
import { UserGift } from "./Page/User/Gift/UserGift";
import { UserEvent } from "./Page/User/Event/UserEvent";
import { SearchUser } from "./Page/Admin/SearchUser/SearchUser";
import { ProjectDetails } from "./Page/Admin/ProjectDetails/ProjectDetails";
import { ProjectSetting } from "./Page/Admin/ProjectSetting/ProjectSetting";
import { GiftRegistration } from "./Page/Admin/GiftRegistration/GiftRegistration";
import { AlertLoadingBox } from "./Component/AlertBox/AlertLoadingBox";

function App() {
  const [status, setStatus] = useState("login");
  const [userName, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState("");

  // change page function
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleRedirect = () => {
    const pageStateExpirationTimeStr: any = localStorage.getItem(
      "pageStateExpirationTime"
    );
    const pageState: any = localStorage.getItem("ef2023_pageState");
    const pageStateExpirationTime = new Date(
      parseInt(pageStateExpirationTimeStr)
    ).getTime();
    const currentTime = new Date().getTime();

    if (pageStateExpirationTimeStr === null) {
    } else if (currentTime > pageStateExpirationTime) {
      localStorage.removeItem("ef2023_pageState");
      localStorage.removeItem("pageStateExpirationTime");
    } else {
      setStatus(pageState);
    }
  };

  // call api to pass the username to TopBar
  const handleGetUserDetails = async () => {
    setShowAlert("loading");
    const userId = localStorage.getItem("ef2023_user_id");
    const res = await fetch(`${api_origin}/account/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const json = await res.json();
    setShowAlert("");

    if (json.result && json.result.length > 0) {
      const username = json.result[0].username;
      setUsername(username);
    }
  };

  useEffect(() => {
    handleRedirect();
    handleGetUserDetails();
  }, []);

  return (
    <>
      <div className="wrapper">
        <TopBar userName={userName} onStatusChange={handleStatusChange} />
        <div className="pageContainer">
          {status === "login" && (
            <Login username={userName} onStatusChange={handleStatusChange} />
          )}
          {status === "register" && (
            <Register onStatusChange={handleStatusChange} />
          )}

          {/* Only for User */}
          {status === "userInfo" && <UserInfo />}
          {status === "userGift" && <UserGift />}
          {status === "userEvent" && <UserEvent />}

          {/* Only for Admin */}
          {status === "searchUser" && <SearchUser />}
          {status === "giftRegistration" && <GiftRegistration />}
          {status === "projectDetails" && <ProjectDetails />}
          {status === "projectSetting" && <ProjectSetting />}
        </div>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
    </>
  );
}

export default App;
