import React, { useState } from "react";
import "./App.css";
import { TopBar } from "../src/Component/TopBar/TopBar";
import { Login } from "./Page/Login";
import { Register } from "./Page/Register/Register";

function App() {
  const [status, setStatus] = useState("login");

  const handleRegisterClick = () => {
    setStatus("register");
  };
  return (
    <div className="wrapper">
      <TopBar />

      {status === "login" && (
        <Login onStatusChange={handleRegisterClick} />
      )}
      {status === "register" && <Register />}
    </div>
  );
}

export default App;
