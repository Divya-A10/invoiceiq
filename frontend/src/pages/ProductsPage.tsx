import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { updateProduct } from "../features/products/productsSlice";

export default function ProductsPage() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (editable)</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>

              <td>
                <input
                  value={p.price}
                  type="number"
                  onChange={e =>
                    dispatch(
                      updateProduct({
                        ...p,
                        price: Number(e.target.value),
                      })
                    )
                  }
                />
              </td>

              <td>
  <div
    style={{
      background: (p.confidence ?? 0) < 0.85 ? "#7c2d12" : "#064e3b",
      color: "white",
      padding: "6px 10px",
      borderRadius: 6,
      textAlign: "center",
    }}
  >
    {((p.confidence ?? 0) * 100).toFixed(0)}%
  </div>
</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
