import React, { useEffect, useState } from "react";
import { Gift } from "../../../User/Gift/Gift";
import { api_origin } from "../../../../service/api";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";
import { AlertYesNoBox } from "../../../../Component/AlertBox/AlertYesNoBox";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface GiftItem {
  giftID: string;
  name: string;
  details: string;
  point: number;
  btnCall: string;
}

interface DeleteGiftProps {
  goBack: () => void;
}

export const DeleteGift: React.FC<DeleteGiftProps> = ({ goBack }) => {
  const [gifts, setGifts] = useState<GiftItem[] | null>(null);

  const [showAlert, setShowAlert] = useState("");

  const [selectedGiftID, setSelectedGiftID] = useState("");

  //Get all gifts
  const handleGetAllGifts = async () => {
    setShowAlert("loading");
    const project = "新界北義工團";
    const res = await fetch(`${api_origin}/gift`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        project: project,
      }),
    });
    const json = await res.json();
    const updatedGifts = json
      .filter((gift: any) => !gift.isDeleted)
      .reverse()
      .map((gift: any) => {
        const giftAmountCount = gift.giftAmountCount
          ? parseInt(gift.giftAmountCount.count)
          : 0;
        const remainAmount = gift.amount - giftAmountCount;
        return { ...gift, remainAmount };
      });
    setGifts(updatedGifts);
    setShowAlert("");
  };

  const handleDeleteGift = async (
    giftId: string,
    CheckIsConfirmYes?: string
  ) => {
    setSelectedGiftID(giftId);

    if (CheckIsConfirmYes === "") {
      setShowAlert("是否確認刪除？");
      return;
    }

    if (CheckIsConfirmYes === "false") {
      setShowAlert("");
      return;
    }

    setShowAlert("loading");
    //Get DB data
    const res = await fetch(`${api_origin}/gift/delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        giftId: giftId,
      }),
    });
    const json = await res.json();
    if (json.success) {
      await handleGetAllGifts();
      setShowAlert("成功刪除禮物!");
    } else {
      setShowAlert("未能刪除禮物!");
    }
  };

  useEffect(() => {
    handleGetAllGifts();
  }, []);

  return (
    <>
      <div className="changePasswordContainer">
        <SubPageHeader title="刪除禮物" goBack={goBack} />
        <div className="giftBoardContainer">
          <div className="giftBoard">
            {gifts?.map((gift: any) => (
              <Gift
                key={gift.gift_id}
                giftID={gift.gift_id}
                image={gift.gift_image}
                name={gift.gift_name}
                details={gift.gift_detail}
                point={gift.exchange_point}
                amount={gift.remainAmount}
                onClick={() => handleDeleteGift(gift.gift_id, "")}
                btnName="刪除"
                view="admin"
              />
            ))}
          </div>
        </div>
      </div>

      {showAlert === "loading" && <AlertLoadingBox />}
      {showAlert === "是否確認刪除？" && (
        <AlertYesNoBox
          header={showAlert}
          btnNameOne={{
            btnName: "是",
            onClick: () => handleDeleteGift(selectedGiftID),
          }}
          btnNameTwo={{
            btnName: "否",
            onClick: () => handleDeleteGift(selectedGiftID, "false"),
          }}
        />
      )}
      {showAlert === "成功刪除禮物!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能刪除禮物!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
