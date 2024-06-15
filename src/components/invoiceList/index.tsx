import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../App.css';

interface Invoice {
  [key: string]: string | number;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
  const handleDownloadPdf = (invoice: Invoice, index: number) => {
    const input = document.getElementById(`invoice-${index}`);
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${index + 1}.pdf`);
      });
    }
  };

  useEffect(()=>{
    console.log(Object.entries(invoices))
  },[])


  return (
    <div>
      <h2>Invoices</h2>
      {invoices.length === 0 ? (
        <p>Yüklenen fatura yok</p>
      ) : (
        <div>
          {invoices.map((invoice, index) => (
            <div key={index} className="invoice-container">
              <div style={{display:"flex",flexDirection:"column", height:"100vh",width:"100%"}} id={`invoice-${index}`}>
                <h3 style={{display:"flex",width:"100%",justifyContent:"center"}} className="invoice-title">Fatura</h3>
                <div style={{width:"100%",borderBottom:"1px solid black"}}></div>
                <div style={{display:"flex",flexDirection:"row",height:"100vh"}}>
                  <div style={{display:"flex",flexDirection:"column",marginLeft:"4%",marginTop:"10px"}}>
                    <div style={{padding:"10px"}}>ADET</div>
                    <div style={{padding:"10px"}}>BIRIM</div>
                    <div style={{padding:"10px"}}>URUN KODU</div>
                    <div style={{padding:"10px"}}>URUN</div>
                    <div style={{padding:"10px"}}>BIRIM FIYATI</div>
                    <div style={{padding:"10px"}}>TOPLAM</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",marginLeft:"4%",marginTop:"10px"}}>
                    {Object.entries(invoice).map(([key, value]) => (
                      <div style={{padding:"10px"}} key={key}>{value}</div>

                    ))}
                  </div>
                </div>
              </div>
              <button className='download-pdf' onClick={() => handleDownloadPdf(invoice, index)}>PDF Olarak İndir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;