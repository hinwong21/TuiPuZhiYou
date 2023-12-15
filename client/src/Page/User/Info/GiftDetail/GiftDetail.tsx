import React from "react";
import "./GiftDetail.css";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";

interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  return (
    <div>
      <SubPageHeader title="換領禮物詳情" goBack={goBack} />
    </div>
  );
};
