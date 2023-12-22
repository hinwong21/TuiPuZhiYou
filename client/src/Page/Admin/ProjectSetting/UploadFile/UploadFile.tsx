import React, { useState } from "react";
import { SubPageHeader } from "../../../../Component/SubPageHeader/SubPageHeader";
import * as XLSX from "xlsx";

interface UploadFileProps {
  goBack: () => void;
}

export const UploadFile: React.FC<UploadFileProps> = ({ goBack }) => {
  const [tableName, setTableName] = useState("");

  const [headers, setHeaders] = useState([]);
  const [results, setResults] = useState([]);

  const str = "22-Dec-2023";
  console.log(new Date(str));

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
        console.log(sheetName); // "users"
        setTableName(sheetName);

        console.log(data);
        setHeaders(data[0]);
        setResults(data.slice(1));
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="changePasswordContainer">
      <SubPageHeader title="上傳文件" goBack={goBack} />

      <input type="file" onChange={handleFileUpload} />

      <div>{tableName}</div>

      <table>
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
  );
};
