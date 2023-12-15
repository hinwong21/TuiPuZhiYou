import React, { useEffect, useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { api_origin } from "../../../../service/api";
import "./EventDetail.css";

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
    setRecords(json.result);
  };

  useEffect(() => {
    getAllJoinedEventRecords();
  }, []);

  return (
    <div>
      <SubPageHeader title="活動報名詳情" goBack={goBack} />

      <div className="eventDetailEventHeader">已報名活動</div>
      {records.map((record: any, index: number) => (
        <div className="eventDetailEventName" key={index}>
          {record.event_name}
        </div>
      ))}
    </div>
  );
};
