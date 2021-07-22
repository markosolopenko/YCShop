import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/Loader/Loader";
import { TableOfOrders } from "components/TableOfOrders/TableOfOrders";
import { getOrdersThunk } from "../../features/orders/thunks";
import { selectStatus, selectOrdersList } from "../../features/orders/selectors";
import { PENDING } from "../../constants/status";
import s from "./Orders.module.scss";

export const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const orders = useSelector(selectOrdersList);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  if (status === PENDING) {
    return <Loader />;
  }

  return (
    <div className={s.orders}>
      <div className={s.orders__table}>
        <TableOfOrders orders={orders} />
      </div>
    </div>
  );
};
