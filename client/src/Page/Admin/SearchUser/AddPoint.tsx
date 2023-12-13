import React from "react";
import "./AddPoint.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";

interface UserInformation {
  street: string;
  number: string;
  floor: string;
  unit: string;
  username: string;
}

interface AddPointProps {
  userInformation: UserInformation;
  goBack: () => void;
}

export const AddPoint: React.FC<AddPointProps> = ({
  userInformation,
  goBack,
}) => {
  // Your AddPoint component logic here
  return (
    <div className="addPointContainer">
      <div onClick={goBack} className="addPointBackBtnContainer">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="addPointBackBtn"
        />
      </div>

      {/* Display user information in AddPoint component */}
      <p>Street: {userInformation.street}</p>
      <p>Number: {userInformation.number}</p>
      <p>Floor: {userInformation.floor}</p>
      <p>Unit: {userInformation.unit}</p>
      <p>Name: {userInformation.username}</p>
    </div>
  );
};
