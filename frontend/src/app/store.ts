import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/invoiceSlice";
import productsReducer from "../features/products/productsSlice";
import customersReducer from "../features/customers/customersSlice";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
