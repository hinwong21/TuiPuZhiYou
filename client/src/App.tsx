import React, { useEffect, useState } from "react";
import "./App.css";
import { TopBar } from "../src/Component/TopBar/TopBar";
import { Login } from "./Page/Login/Login";
import { Register } from "./Page/Register/Register";
import { api_origin } from "./service/api";

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

    if (json.result !== undefined) {
      setUsername(json.result[0].username);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, [status]);

  const handleRegisterClick = () => {
    setStatus("register");
  };

  return (
    <div className="wrapper">
      <TopBar userName={userName} />

      {status === "login" && <Login onStatusChange={handleRegisterClick} />}
      {status === "register" && <Register />}
    </div>
  );
}

export default App;
