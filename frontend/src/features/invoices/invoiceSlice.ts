import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Invoice = {
  id: string;
  customer: string;
  productIds: string[];
  confidence?: number;
};

const initialState: Invoice[] = [];

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (_state, action: PayloadAction<Invoice[]>) => action.payload,

    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const idx = state.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },

    clearInvoices: () => [],
  },
});

export const { setInvoices, updateInvoice, clearInvoices } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;
