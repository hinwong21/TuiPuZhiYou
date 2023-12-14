import React, { useRef, useState } from "react";
import "./EditGift.css";
import { BackBtn } from "../../../../Component/BackBtn/BackBtn";
import { Input } from "../../../../Component/Input/Input";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import { api_origin } from "../../../../service/api";
import { convertFileToBase64 } from "../../../../service/imgToBase64";

interface EditGiftProps {
  goBack: () => void;
}

export const EditGift: React.FC<EditGiftProps> = ({ goBack }) => {
  const [image, setImage] = useState<File | null | undefined>(null);
  const [exchangePoint, setExchangePoint] = useState("");
  const [giftDetail, setGiftDetail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(selectedImage);
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

  // click the div to trigger the file input
  const handleUploadImageBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInsertGift = async () => {
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
          }),
        });

        const json = await res.json();
        if (json.success) {
          alert("成功添加禮物");
          setImage(null);
          setExchangePoint("");
          setGiftDetail("");
        } else {
          alert("未能添加禮物");
        }
      } else {
        alert("未上傳禮物圖片");
      }
    } catch (error) {
      console.error("Error handling gift insertion:", error);
    }
  };

  return (
    <div className="editGiftContainer">
      <BackBtn goBack={goBack} />
      <header className="editGiftHeader">添加禮物</header>

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
        title="兌換分數"
        type={"text"}
        value={exchangePoint}
        onChange={handleExchangePointChange}
      />

      <div className="inputCompoContainer">
        <div className="inputCompoTitle">禮物詳情</div>
        <textarea
          className="editGiftGiftDetail"
          placeholder="禮物詳情"
          value={giftDetail}
          onChange={handleGiftDetailChange}
        ></textarea>
      </div>

      <div onClick={handleInsertGift}>
        <ConfirmButton type={"button"} btnName="確認" />
      </div>
    </div>
  );
};
