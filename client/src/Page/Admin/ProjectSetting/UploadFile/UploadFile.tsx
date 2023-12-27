import React, { useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import * as XLSX from "xlsx";
import { ConfirmButton } from "../../../../Component/ConfirmButton/ConfirmButton";
import "./UploadFile.css";
import { api_origin } from "../../../../service/api";
import { AlertConBox } from "../../../../Component/AlertBox/AlertConBox";

interface UploadFileProps {
  goBack: () => void;
}

export const UploadFile: React.FC<UploadFileProps> = ({ goBack }) => {
  const [tableName, setTableName] = useState("");
  const [headers, setHeaders] = useState([]);
  const [results, setResults] = useState([]);
  const [showAlert, setShowAlert] = useState("");

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setTableName(sheetName);
        setHeaders(data[0]);
        setResults(data.slice(1));
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleUploadFileToDB = () => {
    setShowAlert("");
    // count res json.success
    let uploadSuccess = 0;

    // count upload row
    let uploadCount = 0;
    if (tableName === "users") {
      results.forEach(async (item: any) => {
        if (item.length > 0) {
          uploadCount += 1;
          const res = await fetch(`${api_origin}/account/upload`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: item[0],
              username: item[1],
              emailOrPhoneNum: item[2],
              password: item[3],
              street: item[4],
              number: item[5],
              floor: item[6],
              unit: item[7],
              project_id: item[8],
              date_add: new Date(item[9]),
            }),
          });
          const json = await res.json();
          if (json.success === true) {
            uploadSuccess += 1;
          }
        }
        if (uploadSuccess === uploadCount) {
          setShowAlert("成功上傳!");
        } else {
          setShowAlert("未能上傳!");
        }
      });
    } else if (tableName === "earnPointRecords") {
      results.forEach(async (item: any) => {
        if (item.length > 0) {
          uploadCount += 1;
          const res = await fetch(`${api_origin}/record/point`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: item[0],
              point: item[1],
              weight: item[2],
              project: item[3],
              date_add: new Date(item[4]),
            }),
          });
          const json = await res.json();
          if (json.success === true) {
            uploadSuccess += 1;
          }
        }
        if (uploadSuccess === uploadCount) {
          setShowAlert("成功上傳!");
        } else {
          setShowAlert("未能上傳!");
        }
      });
    } else if (tableName === "joinedEventRecords") {
      results.forEach(async (item: any) => {
        if (item.length > 0) {
          uploadCount += 1;
          const res = await fetch(`${api_origin}/record/event/upload`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: item[0],
              event_name: item[1],
              apply_date: new Date(item[2]),
              project: item[3],
            }),
          });
          const json = await res.json();
          if (json.success === true) {
            uploadSuccess += 1;
          }
        }
        if (uploadSuccess === uploadCount) {
          setShowAlert("成功上傳!");
        } else {
          setShowAlert("未能上傳!");
        }
      });
    } else if (tableName === "exchangeGiftRecords") {
      results.forEach(async (item: any) => {
        let isExchanged = false;
        let exchangedDate: any = new Date(item[5]);

        // set string to type boolean
        if (item[2] === "true") {
          isExchanged = true;
        }

        // if no date, set to undefined
        if (item[5] === "-") {
          exchangedDate = undefined;
        }

        if (item.length > 0) {
          uploadCount += 1;
          const res = await fetch(`${api_origin}/record/gift/upload`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: item[0],
              gift_name: item[1],
              isExchanged: isExchanged,
              project: item[3],
              apply_date: new Date(item[4]),
              exchanged_date: exchangedDate,
            }),
          });
          const json = await res.json();
          if (json.success === true) {
            uploadSuccess += 1;
          }
        }
        if (uploadSuccess === uploadCount) {
          setShowAlert("成功上傳!");
        } else {
          setShowAlert("未能上傳!");
        }
      });
    }
  };
  return (
    <>
      <div className="changePasswordContainer">
        <SubPageHeader title="上傳文件" goBack={goBack} />

        <div className="adminDetailGap"></div>
        <div className="uploadFileInputContainer">
          <input
            type="file"
            onChange={handleFileUpload}
            className="uploadFileInput"
          />
        </div>

        <div className="adminDetailGap"></div>

        {tableName !== "" && (
          <ConfirmButton btnName={"上傳文件"} onClick={handleUploadFileToDB} />
        )}

        <div className="uploadFileName">{tableName}</div>
        <table className="uploadFileTable">
          <thead>
            <tr>
              {headers.map((header: any, index: number) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {result.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAlert === "成功上傳!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
      {showAlert === "未能上傳!" && (
        <AlertConBox header={showAlert} btnName={"確認"} />
      )}
    </>
  );
};
