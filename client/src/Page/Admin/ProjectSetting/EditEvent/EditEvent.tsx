import React from "react";
import "./EditEvent.css";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";

interface EditEventProps {
  goBack: () => void;
}
export const EditEvent: React.FC<EditEventProps> = ({ goBack }) => {
  return (
    <div className="editGiftContainer">
      <BackBtn goBack={goBack} />
      <div>EditEvent</div>
    </div>
  );
};
