import React, { useRef, useState } from "react";
import { Input } from "../../../../Component/Input/Input";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { convertFileToBase64 } from "../../../../service/imgToBase64";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";

interface AddEventProps {
  goBack: () => void;
}
export const AddEvent: React.FC<AddEventProps> = ({ goBack }) => {
  const [name, setName] = useState("");
  const [participant, setParticipant] = useState("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [detail, setDetail] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleParticipantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticipant(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(selectedImage);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // click the div to trigger the file input
  const handleUploadImageBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEventDetailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetail(event.target.value);
  };

  const handleInsertEvent = async () => {
    await setShowAlert("");
    try {
      if (image) {
        const base64Image = await convertFileToBase64(image);

        const res = await fetch(`${api_origin}/event`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            participant: participant,
            detail: detail,
            image: base64Image,
          }),
        });

        const json = await res.json();
        if (json.success) {
          setShowAlert("添加活動成功!");
          setName("");
          setImage(null);
          setParticipant("");
          setDetail("");
        } else {
          setShowAlert("未能添加活動!");
        }
      } else {
        setShowAlert("未上傳活動圖片!");
      }
    } catch (error) {
      console.error("Error handling gift insertion:", error);
    }
  };

  return (
    <>
      <div className="editGiftContainer">
        <SubPageHeader title="添加活動" goBack={goBack} />

        <Input
          title="活動名稱"
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <div className="inputCompoContainer">
          <div className="inputCompoTitle">活動圖片</div>
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
          title="活動人數"
          type="text"
          value={participant}
          onChange={handleParticipantChange}
        />

        <div className="inputCompoContainer">
          <div className="inputCompoTitle">活動詳情</div>
          <textarea
            className="editGiftGiftDetail"
            placeholder="活動詳情"
            value={detail}
            onChange={handleEventDetailChange}
          ></textarea>
        </div>

        <ConfirmButton
          type={"button"}
          btnName="確認"
          onClick={handleInsertEvent}
        />
      </div>

      {showAlert === "添加活動成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能添加活動!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未上傳活動圖片!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
