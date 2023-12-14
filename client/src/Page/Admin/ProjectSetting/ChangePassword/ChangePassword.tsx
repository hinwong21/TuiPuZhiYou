import React from "react";
import "./ChangePassword.css";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";

interface ChangePasswordProps {
  goBack: () => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({ goBack }) => {
  return (
    <div className="editGiftContainer">
      <BackBtn goBack={goBack} />
      <div>ChangePassword</div>
    </div>
  );
};
