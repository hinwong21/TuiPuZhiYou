import React, { useRef, useState } from "react";
import "./AddGift.css";
import { Input } from "../../../../Component/Input/Input";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { convertFileToBase64 } from "../../../../service/imgToBase64";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";

interface AddGiftProps {
  goBack: () => void;
}

export const AddGift: React.FC<AddGiftProps> = ({ goBack }) => {
  const [image, setImage] = useState<File | null | undefined>(null);
  const [exchangePoint, setExchangePoint] = useState("");
  const [giftDetail, setGiftDetail] = useState("");
  const [giftName, setGiftName] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(selectedImage);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExchangePointChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExchangePoint(event.target.value);
  };

  const handleGiftDetailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGiftDetail(event.target.value);
  };

  const handleGiftNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGiftName(event.target.value);
  };

  // click the div to trigger the file input
  const handleUploadImageBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInsertGift = async () => {
    await setShowAlert("");
    try {
      if (image) {
        const base64Image = await convertFileToBase64(image);

        const res = await fetch(`${api_origin}/gift`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
            exchangePoint: exchangePoint,
            giftDetail: giftDetail,
            giftName: giftName,
          }),
        });

        const json = await res.json();
        if (json.success) {
          setShowAlert("添加禮物成功!");
          setImage(null);
          setExchangePoint("");
          setGiftDetail("");
          setGiftName("");
        } else {
          setShowAlert("未能添加禮物!");
        }
      } else {
        setShowAlert("未上傳禮物圖片!");
      }
    } catch (error) {
      console.error("Error handling gift insertion:", error);
    }
  };

  return (
    <>
      <div className="editGiftContainer">
        <SubPageHeader title="添加禮物" goBack={goBack} />

        <div className="inputCompoContainer">
          <div className="inputCompoTitle">禮物圖片</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          {image && (
            <div className="uploadedImageContainer">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Gift"
                className="uploadedImage"
              />
            </div>
          )}
          <div className="uploadImageBtn" onClick={handleUploadImageBtnClick}>
            上傳圖片
          </div>
        </div>

        <Input
          notNullable
          title="兌換分數"
          type={"number"}
          value={exchangePoint}
          onChange={handleExchangePointChange}
        />

        <div className="inputCompoContainer">
          <div className="inputCompoTitle">禮物名稱</div>
          <textarea
            className="editGiftGiftName"
            placeholder="禮物名稱"
            value={giftName}
            onChange={handleGiftNameChange}
          ></textarea>
          <div className="inputCompoTitle">換領詳情</div>
          <textarea
            className="editGiftGiftDetail"
            placeholder="換領詳情"
            value={giftDetail}
            onChange={handleGiftDetailChange}
          ></textarea>
        </div>

        <ConfirmButton
          type={"button"}
          btnName="確認"
          onClick={handleInsertGift}
        />
      </div>

      {showAlert === "添加禮物成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能添加禮物!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未上傳禮物圖片!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
