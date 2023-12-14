import React from "react";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";
interface UserDetailProps {
  goBack: () => void;
}
export const UserDetail: React.FC<UserDetailProps> = ({ goBack }) => {
  return <BackBtn goBack={goBack} />;
};
