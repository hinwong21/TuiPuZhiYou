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
    const res = await fetch(`${api_origin}/gift/`, {
      method: "GET",
    });
    const json = await res.json();
    const filteredGifts = json
      .filter((gift: any) => gift.isDeleted === false)
      .reverse();
    setGifts(filteredGifts);
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
                onClick={() => handleDeleteGift(gift.gift_id, "")}
                btnName="刪除"
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
