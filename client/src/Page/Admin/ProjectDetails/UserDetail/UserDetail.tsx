import React, { useState } from "react";
import "./UserDetail.css";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { projectOptions } from "../../../../service/projectOption";
import { Select } from "../../../../Interaction/Select/Select";
import { DatePickerRange } from "../../../../Component/DatePickerRange/DatePickerRange";

interface UserDetailProps {
  goBack: () => void;
}

export const UserDetail: React.FC<UserDetailProps> = ({ goBack }) => {
  const [project, setProject] = useState<string>("");

  const handleProjectChange = (selectedOption: string) => {
    setProject(selectedOption);
  };

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

      <DatePickerRange />
    </div>
  );
};
