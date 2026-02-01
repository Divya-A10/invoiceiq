import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function CustomersPage() {
  const customers = useSelector((state: RootState) => state.customers);
  const invoices = useSelector((state: RootState) => state.invoices);


  // helper: calculate invoice total from productIds
const getInvoiceTotal = (inv: any) => {
  if (Array.isArray(inv.products)) {
    return inv.products.reduce((sum: number, p: any) => sum + (p.price ?? 0), 0);
  }

  if (typeof inv.total === "number") return inv.total;

  return 0;
};


  // total per customer from invoices
  const customerTotals: Record<string, number> = {};

  (invoices || []).forEach(inv => {
  const invoiceTotal = getInvoiceTotal(inv);

    customerTotals[inv.customer] =
      (customerTotals[inv.customer] || 0) + invoiceTotal;
  });

  return (
    <div>
      <h2>Customers</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Spend</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => {
            const confidence = c.confidence ?? 0;
            const total = customerTotals[c.name];

            return (
              <tr key={c.id || c.name}>
                <td>{c.name}</td>

                {/* Total spend + missing highlight */}
                <td style={{ color: "#2f351e", fontWeight: 600 }}>
  ₹{total.toFixed(2)}
</td>


                {/* Confidence badge */}
                <td>
                  <div
                    style={{
                      background: confidence < 0.85 ? "#7c2d12" : "#064e3b",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: 6,
                      textAlign: "center",
                      minWidth: 60,
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
