import React from "react";
import "./App.css";
import { TopBar } from "../src/Component/TopBar/TopBar";
import { Input } from "./Component/Input/Input";

function App() {
  return (
    <div className="wrapper">
      <TopBar />
      <Input title="用戶名稱" />
    </div>
  );
}

export default App;
