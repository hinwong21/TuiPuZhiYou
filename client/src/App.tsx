import React, { useEffect, useState } from "react";
import "./App.css";
import { TopBar } from "../src/Component/TopBar/TopBar";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";
import { api_origin } from "./service/api";
import { UserInfo } from "./Page/User/Info/UserInfo";

function App() {
  const [status, setStatus] = useState("login");
  const [userName, setUsername] = useState("");

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

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    handleGetUserDetails();

    // if logged in, direct to info
    const isAdmin = localStorage.getItem("ef2023_isAdmin");
    console.log(isAdmin, userName);

    if (userName !== "") {
      if (isAdmin === "false") {
        setStatus("userInfo");
      } else {
        setStatus("adminInfo");
      }
    }
  }, [status, userName]);

  return (
    <div className="wrapper">
      <TopBar userName={userName} />

      {status === "login" && <Login onStatusChange={handleStatusChange} />}
      {status === "register" && (
        <Register onStatusChange={handleStatusChange} />
      )}
      {status === "userInfo" && <UserInfo />}
    </div>
  );
}

export default App;
