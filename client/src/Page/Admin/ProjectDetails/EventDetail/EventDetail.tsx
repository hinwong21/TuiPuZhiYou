import React, { useCallback, useEffect, useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { Select } from "../../../../Interaction/Select/Select";
import { projectOptions } from "../../../../service/projectOption";
import { api_origin } from "../../../../service/api";
import "./EventDetail.css";

interface EventDetailProps {
  goBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ goBack }) => {
  const [project, setProject] = useState<string>("P001");
  const [details, setDetails] = useState([]);

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

  const handleGetJoinedEventDetail = useCallback(async () => {
    const res = await fetch(`${api_origin}/record/admin/event`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project: project,
      }),
    });
    const json = await res.json();
    console.log(json.result);
    setDetails(json.result);
  }, [project]);

  useEffect(() => {
    handleGetJoinedEventDetail();
  }, [handleGetJoinedEventDetail]);

  return (
    <div className="adminDetailContainer">
      <SubPageHeader title="活動報名詳情" goBack={goBack} />
      <div className="adminDetailGap"></div>

      <Select
        title="計劃"
        options={projectOptions}
        selectedOption={project}
        onSelectOption={handleProjectChange}
      />

      <table className="adminUserDetailTableContainer">
        <thead>
          <tr>
            <th className="adminEventDetailTableName">活動名稱</th>
            <th className="adminEventDetailTableParticipant">可報名人數</th>
            <th className="adminEventDetailTableJoinedParticipant">
              已報名人數
            </th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail: any, index: number) => (
            <tr key={index}>
              <td>{detail.event_name}</td>
              <td>{detail.participant}</td>
              {detail.participantJoined === null ? (
                <td>0</td>
              ) : (
                <td>{detail.participantJoined}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
