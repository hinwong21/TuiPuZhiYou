import React from "react";
import { ConfirmButton, ButtonName } from "../ConfirmButton/ConfirmButton";
import "./AlertBox.css";

interface Alert {
  header: string;
  btnNameOne: ButtonName;
  btnNameTwo: ButtonName;
  onClick?: any;
}

export const AlertYesNoBox = (props: Alert) => {
  const { header, btnNameOne, btnNameTwo } = props;

  return (
    <div className="alertContainer">
      <div className="alertMidContainer">
        <div className="alertHeader">{header}</div>
        <div className="alertBtnBox">
          <ConfirmButton
            type="button"
            btnName={btnNameOne.btnName}
            onClick={btnNameOne.onClick}
          />
          <ConfirmButton
            type="button"
            btnName={btnNameTwo.btnName}
            onClick={btnNameTwo.onClick}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
