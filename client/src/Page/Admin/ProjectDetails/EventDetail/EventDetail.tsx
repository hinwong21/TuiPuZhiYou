import React from "react";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";

interface EventDetailProps {
  goBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ goBack }) => {
  return <BackBtn goBack={goBack} />;
};
