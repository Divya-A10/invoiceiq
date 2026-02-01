import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function InvoicesPage() {
  const invoices = useSelector((state: RootState) => state.invoices);
  

  // compute total by invoiceId instead of productIds
  const getInvoiceTotal = (inv: any) => {
  if (Array.isArray(inv.products)) {
    return inv.products.reduce((sum: number, p: any) => sum + (p.price ?? 0), 0);
  }

  if (typeof inv.total === "number") return inv.total;

  return 0;
};


  return (
    <div>
      <h2>Invoices</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {(invoices || []).map(inv => {
            const confidence = inv.confidence ?? 0;
            const total = getInvoiceTotal(inv);


            return (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.customer}</td>

                {/* INR Total */}
                <td style={{ color: "#454F2A", fontWeight: 600 }}>
  ₹{total.toFixed(2)}
</td>


                <td>
                  <div
                    style={{
                      background: confidence < 0.85 ? "#7c2d12" : "#064e3b",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: 6,
                      textAlign: "center",
                    }}
                  >
                    {(confidence * 100).toFixed(0)}%
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
