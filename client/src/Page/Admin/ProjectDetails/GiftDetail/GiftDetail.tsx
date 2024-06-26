import React, { useCallback, useEffect, useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { Select } from "../../../../Interaction/Select/Select";
import { projectOptions } from "../../../../service/projectOption";
import { api_origin } from "../../../../service/api";
import "./GiftDetail.css";
import { dateFormat } from "../../../../service/dateFormat";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  const [project, setProject] = useState<string>("新界北義工團");
  const [details, setDetails] = useState([]);
  const [showAlert, setShowAlert] = useState("");
  const isManager = localStorage.getItem("ef2023_isManager");

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

  const handleGetExchangedGiftDetail = useCallback(async () => {
    setShowAlert("loading");
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

    json.result.forEach((item: any) => {
      if (item.exchange_date) {
        item.exchange_date = dateFormat(item.exchange_date);
      }
    });

    setDetails(json.result);
    setShowAlert("");
  }, [project]);

  useEffect(() => {
    handleGetExchangedGiftDetail();
  }, [handleGetExchangedGiftDetail]);

  return (
    <>
      <div className="adminDetailContainer">
        <SubPageHeader title="換領禮物詳情" goBack={goBack} />
        <div className="adminDetailGap"></div>

        {isManager && (
          <Select
            title="計劃"
            options={projectOptions}
            selectedOption={project}
            onSelectOption={handleProjectChange}
          />
        )}

        <table className="adminUserDetailTableContainer">
          <thead>
            <tr>
              <th className="adminGiftDetailTableId">換領號碼</th>
              <th className="adminGiftDetailTableGiftName">禮物名稱</th>
              <th className="adminGiftDetailTableAddress">地址</th>
              <th className="adminGiftDetailIsExchanged">換領否</th>
              <th className="adminGiftDetailIsExchangedDate">換領日期</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail: any, index: number) => (
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
            ))}
          </tbody>
        </table>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
    </>
  );
};
