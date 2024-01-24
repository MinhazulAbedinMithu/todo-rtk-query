import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import { baseApi } from "./api/api";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
