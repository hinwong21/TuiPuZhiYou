import React, { useEffect, useState, useCallback } from "react";
import "./UserDetail.css";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { projectOptions } from "../../../../service/projectOption";
import { Select } from "../../../../Interaction/Select/Select";
import { DatePickerRange } from "../../../../Component/DatePickerRange/DatePickerRange";
import { api_origin } from "../../../../service/api";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface UserDetailProps {
  goBack: () => void;
}

export const UserDetail: React.FC<UserDetailProps> = ({ goBack }) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [project, setProject] = useState<string>("心意習");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    firstDayOfMonth
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    lastDayOfMonth
  );
  const [details, setDetails] = useState([]);
  const [showAlert, setShowAlert] = useState("");
  const isManager = localStorage.getItem("ef2023_isManager");

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const handleGetAllUser = useCallback(async () => {
    setShowAlert("loading");
    const res = await fetch(`${api_origin}/record/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project: project,
        start: selectedStartDate,
        end: selectedEndDate,
      }),
    });
    const json = await res.json();
    const updatedRecords = json.result.map((record: any) => ({
      ...record,
      total_point: Math.round(record.total_point),
      selectedWeight: record.selectedWeight || 0,
    }));
    setDetails(updatedRecords);
    setShowAlert("");
  }, [project, selectedStartDate, selectedEndDate]);

  useEffect(() => {
    handleGetAllUser();
  }, [handleGetAllUser]);

  return (
    <>
      <div className="adminDetailContainer">
        <SubPageHeader title="用戶詳情" goBack={goBack} />
        <div className="adminDetailGap"></div>

        {isManager && (
          <Select
            title="計劃"
            options={projectOptions}
            selectedOption={project}
            onSelectOption={handleProjectChange}
          />
        )}

        <DatePickerRange onDateChange={handleDateChange} />

        <table className="adminUserDetailTableContainer">
          <thead>
            <tr>
              <th className="adminUserDetailTableUsername">用戶名稱</th>
              <th className="adminUserDetailTableAddress">地址</th>
              <th className="adminUserDetailTableTotalPoint">積分</th>
              <th className="adminUserDetailTableTotalWeight">總廚餘重量</th>
              <th className="adminUserDetailTableSelectedWeight">
                日期範圍內的廚餘重量
              </th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail: any, index: number) => (
              <tr key={index}>
                <td>{detail.username}</td>
                <td>
                  {detail.street} {detail.number}號 {detail.floor}樓{" "}
                  {detail.unit}
                </td>
                <td>{detail.total_point}</td>
                <td>{detail.total_weight}</td>
                <td>{detail.selectedWeight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
    </>
  );
};
