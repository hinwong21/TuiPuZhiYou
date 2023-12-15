import React from "react";
import "./SubPageHeader.css";
import { BackBtn } from "../BackBtn/BackBtn";

interface SubHeaderProps {
  goBack: () => void;
  title: string;
}

export const SubPageHeader: React.FC<SubHeaderProps> = ({ goBack, title }) => {
  return (
    <div className="subPageHeader">
      <BackBtn goBack={goBack} />
      <div className="subPageHeaderTitle">{title}</div>
      <div style={{ width: "27px" }}></div>
    </div>
  );
};
