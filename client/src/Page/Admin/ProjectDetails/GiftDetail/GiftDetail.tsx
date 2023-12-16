import React, { useCallback, useEffect, useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { Select } from "../../../../Interaction/Select/Select";
import { projectOptions } from "../../../../service/projectOption";
import { api_origin } from "../../../../service/api";
import "./GiftDetail.css";

interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  const [project, setProject] = useState<string>("P001");
  const [details, setDetails] = useState([]);

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

  const handleGetExchangedGiftDetail = useCallback(async () => {
    const res = await fetch(`${api_origin}/record/admin/gift`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project: project,
      }),
    });
    const json = await res.json();
    setDetails(json.result);
  }, [project]);

  useEffect(() => {
    handleGetExchangedGiftDetail();
  }, [handleGetExchangedGiftDetail]);

  return (
    <div className="adminDetailContainer">
      <SubPageHeader title="換領禮物詳情" goBack={goBack} />
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
            <th className="adminGiftDetailTableId">換領號碼</th>
            <th className="adminGiftDetailTableUsername">用戶名稱</th>
            <th className="adminGiftDetailTableAddress">地址</th>
            <th className="adminGiftDetailIsExchanged">已換領</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail: any, index: number) => (
            <tr key={index}>
              <td>EX- {detail.exchangeGiftRecords_id}</td>
              <td>{detail.username}</td>
              <td>
                {detail.street} {detail.number}號 {detail.floor}樓 {detail.unit}
              </td>
              {detail.isExchanged === false ? <td>未換領</td> : <td>已換領</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
