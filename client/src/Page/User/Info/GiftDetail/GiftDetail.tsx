import React, { useEffect, useState } from "react";
import "./GiftDetail.css";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { api_origin } from "../../../../service/api";
import { dateFormat } from "../../../../service/dateFormat";

interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  const [records, setRecords] = useState<any>([]);

  const getAllExchangeGiftRecords = async () => {
    const userId = localStorage.getItem("ef2023_user_id");
    const res = await fetch(`${api_origin}/record/exchangeGift`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const json = await res.json();

    json.result.forEach((item: any) => {
      if (item.exchange_date) {
        item.exchange_date = dateFormat(item.exchange_date);
      }
    });

    const updatedRecords = json.result.map((record: any) => ({
      ...record,
      exchangePoint: Math.round(record.exchange_point),
    }));

    setRecords(updatedRecords);
  };

  useEffect(() => {
    getAllExchangeGiftRecords();
  }, []);

  return (
    <div>
      <SubPageHeader title="換領禮物詳情" goBack={goBack} />
      <table className="giftDetailTableContainer">
        <thead>
          <tr>
            <th className="giftDetailTableExchangeId">換領號碼</th>
            <th>換領禮物</th>
            <th className="giftDetailTableExchangePoint">換領分數</th>
            <th className="giftDetailTableIsExchanged">已換領</th>
            <th className="giftDetailTableIsExchanged">換領日期</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any, index: number) => (
            <tr key={index}>
              <td>EX-{record.exchangeGiftRecords_id}</td>
              <td className="giftDetailTableDetail">{record.gift_name}</td>
              <td>{record.exchangePoint}</td>
              <td>{record.isExchanged ? "已換領" : "未換領"}</td>
              {record.exchange_date ? (
                <td>{record.exchange_date}</td>
              ) : (
                <td>尚未換領禮物</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
