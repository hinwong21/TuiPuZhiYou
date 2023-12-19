import React, { useState } from "react";
import { Input } from "../../../Component/Input/Input";
import { ConfirmButton } from "../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../service/api";
import { AlertConBox } from "../../../Component/AlertBox/AlertConBox";
import { dateFormat } from "../../../service/dateFormat";

export const GiftRegistration = () => {
  const [giftExchangeId, setGiftExchangeId] = useState("");
  const [details, setDetails] = useState<any>([]);
  const [showAlert, setShowAlert] = useState("");
  const [, setGetExDate] = useState("");

  const handleGiftExchangeIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 6) {
      setGiftExchangeId(inputValue);
    }
  };

  const handleClickGetGiftExchangeRecord = async () => {
    setDetails([]);
    const res = await fetch(`${api_origin}/record/admin/giftId`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: giftExchangeId,
      }),
    });
    const json = await res.json();

    json.result.forEach((item: any) => {
      if (item.exchange_date) {
        item.exchange_date = dateFormat(item.exchange_date);
      }
    });

    setDetails(json.result);
    console.log(json.result);

    if (json.result.length === 0) {
      setShowAlert("沒有此換領號碼!");
    }
  };

  const handleTookGift = async () => {
    await setShowAlert("");
    const res = await fetch(`${api_origin}/record/admin/tookGift`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: giftExchangeId,
      }),
    });
    const json = await res.json();

    if (json.success) {
      setShowAlert("成功領取!");
      handleClickGetGiftExchangeRecord();
      setGiftExchangeId("");
      setGetExDate(json.result.exchange_date);
    } else {
      setShowAlert("未成功領取!");
    }
  };

  return (
    <>
      <div className="projectSettingContainer">
        <header className="projectSettingHeader">禮物登記換領</header>

        <Input
          title={"換領禮物號碼"}
          type={"number"}
          value={giftExchangeId}
          onChange={handleGiftExchangeIdChange}
          component={
            <div className="registerDefaultNotice">*請輸入EX- 後的六位數字</div>
          }
        />

        <ConfirmButton
          btnName={"確認"}
          onClick={handleClickGetGiftExchangeRecord}
        />
        {details.map((detail: any, index: number) => (
          <>
            <table className="adminUserDetailTableContainer">
              <thead>
                <tr>
                  <th className="adminGiftDetailTableId">換領號碼</th>
                  <th className="adminGiftDetailTableGift">換領禮物</th>
                  <th className="adminGiftDetailTableAddress">地址</th>
                  <th className="adminGiftDetailIsExchanged">已換領</th>
                  <th className="adminGiftDetailIsExchanged">換領日期</th>
                </tr>
              </thead>
              <tbody>
                <tr key={index}>
                  <td>EX- {detail.exchangeGiftRecords_id}</td>
                  <td>{detail.gift_name}</td>
                  <td>
                    {detail.street} {detail.number}號 {detail.floor}樓{" "}
                    {detail.unit}
                  </td>
                  {detail.isExchanged === false ? (
                    <td>未換領</td>
                  ) : (
                    <td>已換領</td>
                  )}
                  {detail.exchange_date ? (
                    <td>{detail.exchange_date}</td>
                  ) : (
                    <td>尚未換領禮物</td>
                  )}
                </tr>
              </tbody>
            </table>
            <ConfirmButton btnName={"一鍵換領"} onClick={handleTookGift} />
          </>
        ))}
      </div>

      {showAlert === "沒有此換領號碼!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "成功領取!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未成功領取!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
