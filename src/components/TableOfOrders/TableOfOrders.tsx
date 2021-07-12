import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./TableOfOrders.module.scss";
import { formatMoney } from "../../helpers/formatMoney";
import { Routes } from "../../constants/routes";
import { TProps } from "./types";
import { setOrderId } from "../../features/orders/ordersSlice";

export const TableOfOrders: React.FC<TProps> = ({ orders }) => {
  const dispatch = useDispatch();

  return (
    <table className={s["table-of-orders"]}>
      <thead className={s["table-of-orders__thead"]}>
        <tr>
          <th>Date and Time</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Origin</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={s["table-of-orders__tbody"]}>
        {orders.map((order) => {
          return (
            <Fragment key={order.id}>
              {order.pieces.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{item.product.name}</td>
                    <td>{item.count}</td>
                    <td>{item.product.origin.toUpperCase()}</td>
                    <td>{formatMoney(item.product.price * item.count)}</td>
                    <td>
                      <Link
                        to={Routes.ORDER_DETAILS}
                        className={s.details}
                        onClick={() => dispatch(setOrderId(order.id))}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
