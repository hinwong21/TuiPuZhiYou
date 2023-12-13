import React, { useState } from "react";
import "./Dropdown.css";

type DropdownProps = {
  details: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ details }) => {
  const [show, setShow] = useState<Boolean>(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="dropdownContainer" onClick={handleShow}>
      {!show ? (
        <>
          <div className="hideDetails">{details}</div>
          <div className="showDetailsNotice">點擊了解更多</div>
        </>
      ) : (
        <>
          <div className="details">{details}</div>
          <div className="showDetailsNotice">點擊收起</div>
        </>
      )}
    </div>
  );
};
