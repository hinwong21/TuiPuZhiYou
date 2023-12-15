import React, { useState } from "react";
import { ConfirmButton } from "../ConfirmButton/ConfirmButton";
import "./AlertBox.css";

interface Alert {
  header: string;
  btnName: string;
}

export const AlertConBox = (props: Alert) => {
  const { header, btnName } = props;

  const [show, setShow] = useState(true);
  // [{title:1, onClick:handleShow}, title:2, onClick:onClick}]
  const handleShow = () => {
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
                btnName={btnName}
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
