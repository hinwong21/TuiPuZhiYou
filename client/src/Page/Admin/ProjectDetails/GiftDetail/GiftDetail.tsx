import React from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  return <SubPageHeader title="禮物詳情" goBack={goBack} />;
};
