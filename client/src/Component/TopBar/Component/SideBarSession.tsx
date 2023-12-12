import React from "react";
import "../TopBar.css";

interface SideBarSessionProps {
  title: string;
  handleStatus: (newStatus: string) => void;
}

export const SideBarSession: React.FC<SideBarSessionProps> = ({
  handleStatus,
  title,
}) => {
  return (
    <div
      className="topBarSideBarSession"
      onClick={() => {
        handleStatus("userInfo");
      }}
    >
      {title}
    </div>
  );
};
