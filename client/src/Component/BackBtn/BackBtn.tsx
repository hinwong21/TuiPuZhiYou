import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./BackBtn.css";

interface BackBtnProps {
  goBack: () => void;
}

export const BackBtn: React.FC<BackBtnProps> = ({ goBack }) => {
  return (
    <div onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} className="backBtn" />
    </div>
  );
};
