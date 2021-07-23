import { createOrder, getOrderById } from "api/ordersRequests";
import { getProductsAddedToCart } from "features/products/selectors";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { IProductsInCart } from "types/types";
import {
  setOrderByIdFulfilled,
  setOrderByIdPending,
  setOrderByIdRejected,
  createOrderFulfilled,
  createOrderRejected,
  createOrderPending,
} from "./ordersSlice";
import { selectOrderId } from "./selectors";
import { TOrderGet } from "./types";

function* fetchOrderByIdWorker() {
  try {
    const id: string = yield select(selectOrderId);

    const order: TOrderGet[] = yield call(getOrderById, `${id}`);
    yield put(setOrderByIdFulfilled(order));
  } catch (error) {
    yield put(setOrderByIdRejected(error));
  }
}

function* createOrderWorker() {
  try {
    const products: IProductsInCart[] = yield select(getProductsAddedToCart);

    yield call(
      createOrder,
      products.map((item) => Object({ productId: item.product.id, count: item.amount }))
    );

    yield put(createOrderFulfilled());
  } catch (error) {
    yield put(createOrderRejected(error));
  }
}

export function* getOrderByIdSaga(): Generator {
  yield takeEvery(setOrderByIdPending.type, fetchOrderByIdWorker);
}

export function* createNewOrderSaga(): Generator {
  yield takeEvery(createOrderPending.type, createOrderWorker);
}
