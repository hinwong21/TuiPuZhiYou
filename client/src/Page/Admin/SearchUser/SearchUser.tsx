import React, { useState } from "react";
import "./SearchUser.css";
import { Input } from "../../../Component/Input/Input";
import { Select } from "../../../Interaction/Select/Select";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { handleKeyPress } from "../../../service/useKeyPress";
import { AddPoint } from "./AddPoint";
import { api_origin } from "../../../service/api";
import {
  tpzyStreetOptions,
  tpzyNumberOptions,
  tpzyFloorOptions,
} from "../../../service/projectOption";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";

export const SearchUser = () => {
  const [directToEarnPointRecord, setDirectToEarnPointRecord] =
    useState("searchUser");
  const [addressSearch, setAddressSearch] = useState(true);
  const [emailOrPhoneNumSearch, setEmailOrPhoneNumSearch] = useState(false);
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [emailOrPhoneNum, setEmailOrPhoneNum] = useState<string>("");
  const [showSearchedUsers, setShowSearchedUsers] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [userDetail, setUserDetail] = useState<any>({});
  const [showAlert, setShowAlert] = useState("");

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
    setEmailOrPhoneNum(event.target.value);
  };

  // set only can search by address or EmailOrPhoneNum
  const handleCheckboxChange = (type: string) => {
    if (type === "address") {
      setAddressSearch(true);
      setEmailOrPhoneNumSearch(false);
    } else {
      setAddressSearch(false);
      setEmailOrPhoneNumSearch(true);
    }
  };

  const handleSearchBtnClick = async () => {
    // use address search
    if (addressSearch) {
      if (street === "" || number === "" || floor === "" || unit === "") {
        setShowAlert("未輸入完整地址!");
        return;
      }

      const res = await fetch(`${api_origin}/account/search/address`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          street: street,
          number: number,
          floor: floor,
          unit: unit,
        }),
      });
      const json = await res.json();
      setSearchedUsers(json.result);
    }

    // use emailOrPhoneNum search
    if (emailOrPhoneNumSearch) {
      if (emailOrPhoneNum === "") {
        setShowAlert("未輸入電話號碼或電郵地址!");
        return;
      }
      const res = await fetch(`${api_origin}/account/search/emailOrPhoneNum`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhoneNum: emailOrPhoneNum,
        }),
      });
      const json = await res.json();
      setSearchedUsers(json.result);
    }
    setShowSearchedUsers(true);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleUserClick = (clickedUser: any) => {
    setUserDetail(clickedUser);
    setDirectToEarnPointRecord("addRecord");
  };

  const addPointGoBack = () => {
    setDirectToEarnPointRecord("searchUser");
  };

  return (
    <>
      <div className="searchUserContainer">
        {directToEarnPointRecord === "searchUser" ? (
          <>
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
              <Select
                title="街"
                options={tpzyStreetOptions}
                selectedOption={street}
                onSelectOption={handleStreetChange}
              />
              <Select
                title="號"
                options={tpzyNumberOptions}
                selectedOption={number}
                onSelectOption={handleNumberChange}
              />
              <Select
                title="樓層"
                options={tpzyFloorOptions}
                selectedOption={floor}
                onSelectOption={handleFloorChange}
              />
              <Input
                title="單位"
                type="text"
                value={unit}
                onChange={handleUnitChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyPress(e, "Enter", handleSearchBtnClick)
                }
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
                <div className="searchUserInputTitle">
                  電話號碼 / 電郵地址搜尋
                </div>
              </div>
              <Input
                title="電話號碼或電郵地址"
                type="text"
                value={emailOrPhoneNum}
                onChange={handlePhoneNumOrEmailChange}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyPress(e, "Enter", handleSearchBtnClick)
                }
              />
            </div>

            <ConfirmButton
              btnName="搜尋"
              type={"button"}
              onClick={handleSearchBtnClick}
            />

            {showSearchedUsers && (
              <div className="searchUserResultContainer">
                <div className="searchUserResultHeader">搜尋結果</div>
                {searchedUsers.length > 0 ? (
                  searchedUsers.map((user, index) => (
                    <div
                      key={index}
                      className="searchUserResult"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.street + " "}
                      {user.number}號 {user.floor}樓 {user.unit} {user.username}
                    </div>
                  ))
                ) : (
                  <div className="searchUserResultNone">
                    未找到符合條件的用戶
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <AddPoint userDetail={userDetail} goBack={addPointGoBack} />
        )}
      </div>

      {showAlert === "未輸入完整地址!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未輸入電話號碼或電郵地址!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
