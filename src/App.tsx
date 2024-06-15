import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InvoiceUploader from './components/invociceUploader';
import InvoiceList from './components/invoiceList';

interface Invoice {
  [key: string]: string | number;
}

function App() {
  
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredData, setFilteredData] = useState<Invoice[]>([]);
  const handleInvoicesParsed = (invoices: Invoice[]) => {
    const filtered = invoices.filter(item => Object.keys(item).length === 6);
    setFilteredData(filtered);
    console.log(invoices)
  };

  return (
    <div>
    <h1 style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center"}}>Invoice Generator</h1>
    <InvoiceUploader onInvoicesParsed={handleInvoicesParsed} />
    <InvoiceList invoices={filteredData} />
  </div>
  )
}

export default App
