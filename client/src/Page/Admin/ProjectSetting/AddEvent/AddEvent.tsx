import React, { useRef, useState } from "react";
import { Input } from "../../../../Component/Input/Input";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { convertFileToBase64 } from "../../../../service/imgToBase64";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";
import { AlertLoadingBox } from "../../../../Component/AlertBox/AlertLoadingBox";

interface AddEventProps {
  goBack: () => void;
}
export const AddEvent: React.FC<AddEventProps> = ({ goBack }) => {
  const [name, setName] = useState("");
  const [participant, setParticipant] = useState("1");
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

    if (name === "") {
      setShowAlert("未填寫活動名稱!");
      return;
    }

    if (participant === "") {
      setShowAlert("未填寫活動人數!");
      return;
    }

    if (image) {
      setShowAlert("loading");
      const base64Image = await convertFileToBase64(image);
      const project = "推普之友";

      const res = await fetch(`${api_origin}/event/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          participant: participant,
          detail: detail,
          image: base64Image,
          project: project,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setShowAlert("添加活動成功!");
        setName("");
        setImage(null);
        setParticipant("1");
        setDetail("");
      } else {
        setShowAlert("未能添加活動!(請檢查填寫資料)");
      }
    } else {
      setShowAlert("未上傳活動圖片!");
    }
  };

  return (
    <>
      <div className="editGiftContainer">
        <SubPageHeader title="添加活動" goBack={goBack} />

        <div className="inputCompoContainer">
          <div className="inputCompoTitle">
            <span style={{ color: "red" }}>*</span>活動圖片
          </div>
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
          title="活動名稱"
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <Input
          notNullable
          title="活動人數"
          type="number"
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

      {showAlert === "loading" && <AlertLoadingBox />}
      {showAlert === "添加活動成功!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能添加活動!(請檢查填寫資料)" && (
        <AlertConBox
          header={
            <div>
              未能添加禮物!
              <br />
              (請檢查填寫資料)
            </div>
          }
          btnName={"確認"}
        />
      )}
      {showAlert === "未上傳活動圖片!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未填寫活動名稱!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未填寫活動人數!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
