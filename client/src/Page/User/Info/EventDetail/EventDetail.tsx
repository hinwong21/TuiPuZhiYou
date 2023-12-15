import React from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";

interface EventDetailProps {
  goBack: () => void;
}
export const EventDetail: React.FC<EventDetailProps> = ({ goBack }) => {
  return (
    <div>
      <SubPageHeader title="活動報名詳情" goBack={goBack} />
    </div>
  );
};
