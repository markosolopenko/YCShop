import { orderByIdSaga } from "features/orders/sagas";
import { all } from "redux-saga/effects";

export function* rootSaga(): Generator {
  yield all([orderByIdSaga()]);
}
