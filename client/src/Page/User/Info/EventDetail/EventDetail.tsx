import React, { useEffect, useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { api_origin } from "../../../../service/api";

interface EventDetailProps {
  goBack: () => void;
}
export const EventDetail: React.FC<EventDetailProps> = ({ goBack }) => {
  const [records, setRecords] = useState<any>([]);

  const getAllJoinedEventRecords = async () => {
    const userId = localStorage.getItem("ef2023_user_id");
    const res = await fetch(`${api_origin}/record/joinedEvent`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const json = await res.json();
    console.log(json);

    // setRecords(json.result);
  };

  useEffect(() => {
    getAllJoinedEventRecords();
  }, []);

  return (
    <div>
      <SubPageHeader title="活動報名詳情" goBack={goBack} />
      <table className="giftDetailTableContainer">
        <thead>
          <tr>
            <th className="giftDetailTableExchangeId">換領號碼</th>
            <th>換領資料</th>
            <th className="giftDetailTableExchangePoint">換領分數</th>
            <th className="giftDetailTableIsExchanged">已換領</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: any, index: number) => (
            <tr key={index}>
              <td>EX- {record.gift_id}</td>
              <td className="giftDetailTableDetail">{record.gift_detail}</td>
              <td>{record.exchangePoint}</td>
              <td>{record.is_exchanged ? "已換領" : "未換領"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
