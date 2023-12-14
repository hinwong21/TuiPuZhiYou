import React from "react";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";
interface GiftDetailProps {
  goBack: () => void;
}
export const GiftDetail: React.FC<GiftDetailProps> = ({ goBack }) => {
  return <BackBtn goBack={goBack} />;
};
