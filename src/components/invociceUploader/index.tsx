import React from 'react';
import * as XLSX from 'xlsx';

interface InvoiceUploaderProps {
  onInvoicesParsed: (invoices: any[]) => void;
}

const InvoiceUploader: React.FC<InvoiceUploaderProps> = ({ onInvoicesParsed }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      onInvoicesParsed(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center"}} >
      <label className='custom-file-upload' htmlFor="upload-file">
      <input id='upload-file' className='file-input' type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      Choose File
      </label>
    </div>
  );
};

export default InvoiceUploader;