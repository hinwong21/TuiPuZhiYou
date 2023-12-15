import React, { useState } from "react";
import { ConfirmButton } from "../ConfirmButton/ConfirmButton";
import "./AlertBox.css";

interface Alert {
  header: string;
  btnNameOne: string;
  btnNameTwo: string;
  onClick?: any;
}

export const AlertYesNoBox = (props: Alert) => {
  const { header, btnNameOne, btnNameTwo, onClick } = props;

  const [show, setShow] = useState(true);
  // [{title:1, onClick:handleShow}, title:2, onClick:onClick}]
  const handleShow = () => {
    if (btnNameOne) {
      onClick();
    }
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="alertContainer">
          <div className="alertMidContainer">
            <div className="alertHeader">{header}</div>
            <div className="alertBtnBox">
              <ConfirmButton
                type="button"
                btnName={btnNameOne}
                onClick={handleShow}
              />
              <ConfirmButton
                type="button"
                btnName={btnNameTwo}
                onClick={handleShow}
              />
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
};
