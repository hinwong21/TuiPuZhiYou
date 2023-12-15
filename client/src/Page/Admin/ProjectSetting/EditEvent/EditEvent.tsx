import React, { useRef, useState } from "react";
import "./EditEvent.css";
import { Input } from "../../../../Component/Input/Input";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { convertFileToBase64 } from "../../../../service/imgToBase64";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";

interface EditEventProps {
  goBack: () => void;
}
export const EditEvent: React.FC<EditEventProps> = ({ goBack }) => {
  const [participant, setParticipant] = useState("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [detail, setDetail] = useState("");

  const handleParticipantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticipant(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(selectedImage);
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
    try {
      if (image) {
        const base64Image = await convertFileToBase64(image);

        const res = await fetch(`${api_origin}/event`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            participant: participant,
            detail: detail,
            image: base64Image,
          }),
        });

        const json = await res.json();
        if (json.success) {
          alert("成功添加活動");
          setImage(null);
          setParticipant("");
          setDetail("");
        } else {
          alert("未能添加活動");
        }
      } else {
        alert("未上傳禮物活動");
      }
    } catch (error) {
      console.error("Error handling gift insertion:", error);
    }
  };

  return (
    <div className="editGiftContainer">
      <SubPageHeader title="添加活動" goBack={goBack} />

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
  );
};
