import { getOrderById } from "api/ordersRequests";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { setOrderByIdFulfilled, setOrderByIdPending, setOrderByIdRejected } from "./ordersSlice";
import { selectOrderId } from "./selectors";

function* onFetchOrderByIdSaga(): Generator {
  try {
    const id = yield select(selectOrderId);

    const order = yield call(getOrderById, `${id}`);

    yield put(setOrderByIdFulfilled(order));
  } catch (error) {
    yield put(setOrderByIdRejected(error));
  }
}

export function* orderByIdSaga(): Generator {
  yield takeEvery(setOrderByIdPending.type, onFetchOrderByIdSaga);
}
