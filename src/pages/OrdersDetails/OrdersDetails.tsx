import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/Loader/Loader";
import { Empty } from "antd";

import { setOrderByIdPending } from "features/orders/ordersSlice";
import { selectStatus, selectOrdersParams } from "../../features/orders/selectors";
import { PENDING } from "../../constants/status";
import { formatMoney } from "../../helpers/formatMoney";
import s from "./OrdersDetails.module.scss";

export const OrdersDetails: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);

  const { order, orderId } = useSelector(selectOrdersParams);

  useEffect(() => {
    if (orderId) {
      dispatch(setOrderByIdPending());
    }
  }, []);

  if (status === PENDING) {
    return <Loader />;
  }

  return (
    <div className={s["orders-details"]}>
      {order?.pieces ? (
        <div className={s.box}>
          <div className={s.top}>
            <div className={s.item}>
              <div className={s.title}>Date</div>
              <div className={s.content}>
                {order?.createdAt && new Date(order?.createdAt).toDateString()}
              </div>
            </div>
            <div className={s.item}>
              <div className={s.title}>Order No.</div>
              <div className={s.content}>{order?.id}</div>
            </div>
          </div>
          <div className={s["ordered-products"]}>Products</div>
          <div className={s.middle}>
            {order?.pieces.map((item) => {
              return (
                <div className={s.product} key={item.id}>
                  <div className={s.content}>
                    Name: <span>{item.product.name}</span>
                  </div>
                  <div className={s.content}>
                    Amount: <span>{item.count}</span>
                  </div>
                  <div className={s.content}>
                    Origin: <span>{item.product.origin.toUpperCase()}</span>
                  </div>
                  <div className={s.content}>
                    Price: <span>{item.product.price * item.count}$</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.footer}>
            <div className={s.total}>
              Total:
              {order &&
                formatMoney(
                  order?.pieces.reduce((prev, curr) => prev + curr.count * curr.product.price, 0)
                )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
        </div>
      )}
    </div>
  );
};
