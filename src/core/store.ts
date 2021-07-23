import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ordersSlice from "features/orders/ordersSlice";
import productsSlice from "features/products/productsSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { products: productsSlice, orders: ordersSlice },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
