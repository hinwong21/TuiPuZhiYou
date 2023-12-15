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
      <table className="giftDetailTableContainer">
        <tr>
          <th className="giftDetailTableExchangeId">換領號碼</th>
          <th className="giftDetailTableDetail">換領資料</th>
          <th className="giftDetailTableExchangePoint">換領分數</th>
          <th className="giftDetailTableIsExchanged">已換領</th>
        </tr>
        <tr>
          <td className="giftDetailTableExchangeId">EX-029112</td>
          <td className="giftDetailTableDetail">md fkdkfmdkfmkdfmkdmfk</td>
          <td className="giftDetailTableExchangePoint">50</td>
          <td className="giftDetailTableIsExchanged"></td>
        </tr>
        <tr>
          <td className="giftDetailTableExchangeId">EX-029112</td>
          <td className="giftDetailTableDetail">md k</td>
          <td className="giftDetailTableExchangePoint">50</td>
          <td className="giftDetailTableIsExchanged"></td>
        </tr>
        <tr>
          <td className="giftDetailTableExchangeId">EX-029112</td>
          <td className="giftDetailTableDetail">md fkdkfmdkf</td>
          <td className="giftDetailTableExchangePoint">50</td>
          <td className="giftDetailTableIsExchanged"></td>
        </tr>
      </table>
    </div>
  );
};
