import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: string;
  name: string;
  price: number;
  confidence?: number;
};

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (_state, action: PayloadAction<Product[]>) => action.payload,

    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },

    clearProducts: () => [],
  },
});

export const { setProducts, updateProduct, clearProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
