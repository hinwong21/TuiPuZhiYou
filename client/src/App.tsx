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
import { DeleteGift } from "./Page/Admin/ProjectSetting/DeleteGift/DeleteGift";
import { DeleteEvent } from "./Page/Admin/ProjectSetting/DeleteEvent/DeleteEvent";

function App() {
  const [status, setStatus] = useState("login");
  const [userName, setUsername] = useState("");

  // change page function
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  // call api to pass the username to TopBar
  const handleGetUserDetails = async () => {
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

    if (json.result && json.result.length > 0) {
      const username = json.result[0].username;
      setUsername(username);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  return (
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
        {status === "projectDetails" && <ProjectDetails />}
        {status === "projectSetting" && <ProjectSetting />}
      </div>
    </div>
  );
}

export default App;
