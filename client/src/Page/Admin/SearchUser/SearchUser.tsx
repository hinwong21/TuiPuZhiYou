import React, { useState } from "react";
import "./SearchUser.css";
import { Input } from "../../../Component/Input/Input";
import { Dropdown } from "../../../Interaction/Dropdown/Dropdown/Dropdown";
import {
  streetOptions,
  numberOptions,
  floorOptions,
} from "../../Register/AddressOption";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";

export const SearchUser = () => {
  const [addressSearch, setAddressSearch] = useState(true);
  const [emailOrPhoneNumSearch, setEmailOrPhoneNumSearch] = useState(false);
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [phoneNumOrEmail, setPhoneNumOrEmail] = useState<string>("");
  const [showSearchedUser, setShowSearchedUser] = useState(false);

  const handleStreetChange = (selectedOption: string) => {
    setStreet(selectedOption);
  };

  const handleNumberChange = (selectedOption: string) => {
    setNumber(selectedOption);
  };

  const handleFloorChange = (selectedOption: string) => {
    setFloor(selectedOption);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handlePhoneNumOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumOrEmail(event.target.value);
  };

  const handleCheckboxChange = (type: string) => {
    if (type === "address") {
      setAddressSearch(true);
      setEmailOrPhoneNumSearch(false);
    } else {
      setAddressSearch(false);
      setEmailOrPhoneNumSearch(true);
    }
  };

  const handleSearchBtnClick = () => {
    setShowSearchedUser(true);
  };

  const testSearchedUser = {
    street: "同發坊",
    number: "1-3",
    floor: "1",
    unit: "2",
    name: "陳大文",
  };

  return (
    <div className="searchUserContainer">
      <header className="searchUserHeader">搜尋用戶</header>

      <div className="searchUserSession">
        <div className="searchHeaderContainer">
          <input
            type="checkbox"
            checked={addressSearch}
            onChange={() => handleCheckboxChange("address")}
            className="searchUserInput"
          />
          <div className="searchUserInputTitle">地址搜尋</div>
        </div>
        <Dropdown
          title="街"
          options={streetOptions}
          selectedOption={street}
          onSelectOption={handleStreetChange}
        />
        <Dropdown
          title="號"
          options={numberOptions}
          selectedOption={number}
          onSelectOption={handleNumberChange}
        />
        <Dropdown
          title="樓層"
          options={floorOptions}
          selectedOption={floor}
          onSelectOption={handleFloorChange}
        />
        <Input
          title="單位"
          type="text"
          value={unit}
          onChange={handleUnitChange}
        />
      </div>

      <div className="searchUserSession">
        <div className="searchHeaderContainer">
          <input
            type="checkbox"
            checked={emailOrPhoneNumSearch}
            onChange={() => handleCheckboxChange("email")}
            className="searchUserInput"
          />
          <div className="searchUserInputTitle">電話 / 電郵搜尋</div>
        </div>
        <Input
          title="電話號碼或電郵地址"
          type="text"
          value={phoneNumOrEmail}
          onChange={handlePhoneNumOrEmailChange}
        />
      </div>

      <div onClick={handleSearchBtnClick}>
        <ConfirmButton btnName="搜尋" type={"button"} />
      </div>

      {showSearchedUser && (
        <div className="searchUserResultContainer">
          <div className="searchUserResultHeader">搜尋結果</div>
          <div className="searchUserResult">
            {testSearchedUser.street + " "}
            {testSearchedUser.number}號 {testSearchedUser.floor}樓{" "}
            {testSearchedUser.unit} {testSearchedUser.name}
          </div>
        </div>
      )}
    </div>
  );
};
