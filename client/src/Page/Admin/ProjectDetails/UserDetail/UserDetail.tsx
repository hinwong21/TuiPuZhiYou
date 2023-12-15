import React from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
interface UserDetailProps {
  goBack: () => void;
}
export const UserDetail: React.FC<UserDetailProps> = ({ goBack }) => {
  return <SubPageHeader title="用戶詳情" goBack={goBack} />;
};
