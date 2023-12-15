import React from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";

interface EventDetailProps {
  goBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ goBack }) => {
  return <SubPageHeader title="活動詳情" goBack={goBack} />;
};
