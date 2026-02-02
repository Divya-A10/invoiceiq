import { useState } from "react";
import { useDispatch } from "react-redux";

import InvoicesPage from "./pages/InvoicesPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";

import { setInvoices } from "./features/invoices/invoiceSlice";
import { setProducts } from "./features/products/productsSlice";
import { setCustomers } from "./features/customers/customersSlice";

export default function App() {
  const [tab, setTab] = useState<"invoices" | "products" | "customers">("invoices");
  const [uploading, setUploading] = useState(false);
  const [fileTypes, setFileTypes] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || uploading) return;

    setUploading(true);

    const formData = new FormData();
    Array.from(e.target.files).forEach(f => formData.append("files", f));

    try {
      const res = await fetch("https://invoiceiq-88be.onrender.com/upload", {
  method: "POST",
  body: formData,
});


      const data = await res.json();

      dispatch(setInvoices(data.invoices || []));
      dispatch(setProducts(data.products || []));
      dispatch(setCustomers(data.customers || []));

      setFileTypes(data.fileTypes || []);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>InvoiceIQ</h1>

        {(["invoices", "products", "customers"] as const).map(t => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="main">
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{tab[0].toUpperCase() + tab.slice(1)}</h2>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* File badges */}
            {fileTypes.map(t => (
              <div
                key={t}
                style={{
                  background: "#30441B",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              >
                {t}
              </div>
            ))}

            <input
  type="file"
  multiple
  onChange={handleUpload}
  disabled={uploading}
  style={{
    background: "#020617",
    color: "white",
    padding: 6,
    borderRadius: 8,
  }}
/>

          </div>
        </div>

        {/* Card */}
        <div className="card" style={{ marginTop: 20 }}>
          {tab === "invoices" && <InvoicesPage />}
          {tab === "products" && <ProductsPage />}
          {tab === "customers" && <CustomersPage />}
        </div>
      </div>
    </div>
  );
}
