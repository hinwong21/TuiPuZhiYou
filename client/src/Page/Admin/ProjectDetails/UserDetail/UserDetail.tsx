import React, { useEffect, useState } from "react";
import "./UserDetail.css";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { projectOptions } from "../../../../service/projectOption";
import { Select } from "../../../../Interaction/Select/Select";
import { DatePickerRange } from "../../../../Component/DatePickerRange/DatePickerRange";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";

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

  const [project, setProject] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    firstDayOfMonth
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    lastDayOfMonth
  );

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const handleGetAllUser = async () => {
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
    console.log(json);
  };

  useEffect(() => {
    handleGetAllUser();
  });

  return (
    <div className="userDetailContainer">
      <SubPageHeader title="用戶詳情" goBack={goBack} />
      <div className="userDetailGap"></div>
      <Select
        title="計劃"
        options={projectOptions}
        selectedOption={project}
        onSelectOption={handleProjectChange}
      />

      <DatePickerRange onDateChange={handleDateChange} />

      <ConfirmButton btnName="確認" onClick={handleGetAllUser} />

      
    </div>
  );
};
