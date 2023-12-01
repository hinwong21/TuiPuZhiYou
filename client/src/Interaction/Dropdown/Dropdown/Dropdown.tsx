import React, { useState } from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  title: string;
  component?: React.ReactNode;
}

export const Dropdown = ({ title, component }: DropdownProps) => {
  const [show, setShow] = useState(false);
  const [result, setResult] = useState("請選擇");
  const handleShow = () => {
    setShow(!show);
  };

  const handleSelectResult = () => {
    setResult("123");
    setShow(!show);
  };

  return (
    <>
      <div className="dropDownContainer">
        <div className="dropDown">
          <div className="dropDownTitle">{title}:</div>
          <div className="dropDownHeader" onClick={handleShow}>
            <FontAwesomeIcon icon={faChevronDown} color="white" />
            <span>{result}</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {show && (
          <div className="dropDownList">
            <div onClick={handleSelectResult} className="dropDownListOption">
              123
            </div>
            <div onClick={handleSelectResult} className="dropDownListOption">
              324
            </div>
          </div>
        )}
      </div>
    </>
  );
};
