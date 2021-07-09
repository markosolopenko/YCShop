import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/Loader/Loader";
import { getOrdersThunk } from "../../features/orders/thunks";
import { selectStatus } from "../../features/orders/selectors";
import { PENDING } from "../../constants/status";
import s from "./Orders.module.scss";

export const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  if (status === PENDING) {
    return <Loader />;
  }

  return <div className={s.orders}>Orders</div>;
};
