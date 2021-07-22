import { Fragment } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./TableOfOrders.module.scss";
import { formatMoney } from "../../helpers/formatMoney";
import { Routes } from "../../constants/routes";
import { TProps } from "./types";
import { setOrderId } from "../../features/orders/ordersSlice";

const theadItems: string[] = ["Date and Time", "Product", "Amount", "Origin", "Total", ""];

export const TableOfOrders: React.FC<TProps> = ({ orders }) => {
  const dispatch = useDispatch();
  const handleDetailsButtonClick = useCallback((id: string) => {
    dispatch(setOrderId(id));
  }, []);
  return (
    <table className={s["table-of-orders"]}>
      <thead className={s["table-of-orders__thead"]}>
        <tr>
          {theadItems.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
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
                        onClick={() => handleDetailsButtonClick(order.id)}
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
