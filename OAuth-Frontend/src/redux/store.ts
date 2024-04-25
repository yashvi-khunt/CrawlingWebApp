import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { indexApi } from "./api/indexApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [indexApi.reducerPath]: indexApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([indexApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
