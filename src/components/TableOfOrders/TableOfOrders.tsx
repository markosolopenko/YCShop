import { Fragment } from "react";
import s from "./TableOfOrders.module.scss";
import { formatMoney } from "../../helpers/formatMoney";
import { TProps } from "./types";

export const TableOfOrders: React.FC<TProps> = ({ orders }) => {
  return (
    <table className={s["table-of-orders"]}>
      <thead className={s["table-of-orders__thead"]}>
        <tr>
          <th>Date and Time</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Origin</th>
          <th>Total</th>
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
