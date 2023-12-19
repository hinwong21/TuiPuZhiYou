import React from "react";
import "../TopBar.css";

interface SideBarSessionProps {
  locked?: boolean;
  hasPermission?: boolean;
  title: string;
  onClick: any;
}

export const SideBarSession: React.FC<SideBarSessionProps> = ({
  locked,
  hasPermission,
  onClick,
  title,
}) => {
  return (
    <>
      {locked === undefined || (locked === true && hasPermission === true) ? (
        <div className="topBarSideBarSession" onClick={onClick}>
          {title}
        </div>
      ) : (
        locked === true &&
        hasPermission === false && (
          <div className="topBarSideBarSessionLocked">{title}</div>
        )
      )}
    </>
  );
};
