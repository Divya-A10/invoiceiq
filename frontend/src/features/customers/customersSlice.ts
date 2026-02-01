import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Customer = {
  id: string;
  name: string;
  confidence?: number;
};


const initialState: Customer[] = [];

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (_state, action: PayloadAction<Customer[]>) => action.payload,
  },
});

export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;

