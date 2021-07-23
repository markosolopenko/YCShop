import { useCallback, useEffect } from "react";
import { getAllItemsInCartSum, getProductsAddedToCart } from "features/products/selectors";
import { formatMoney } from "helpers/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "helpers/notification";
import { createOrderPending } from "features/orders/ordersSlice";
import { selectError, selectIfOrderCreated } from "features/orders/selectors";
import { Redirect } from "react-router-dom";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import { clearCart } from "../../features/products/productsSlice";
import { Routes } from "../../constants/routes";
import EmptyCart from "../../assets/empty-cart.png";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const productsAddedToCart = useSelector(getProductsAddedToCart);
  const allItemsInCartSum = useSelector(getAllItemsInCartSum);
  const dispatch = useDispatch();
  const orderCreated = useSelector(selectIfOrderCreated);
  const errorOrder = useSelector(selectError);

  useEffect(() => {
    if (orderCreated === "success") {
      dispatch(clearCart());
      openNotificationWithIcon("success", "Make Order", "Order created successfully!!!");
    } else if (orderCreated === "error") {
      openNotificationWithIcon("error", "Make Order", errorOrder);
    }
  }, [orderCreated]);
  const makeOrder = useCallback(() => {
    dispatch(createOrderPending());
  }, []);

  if (orderCreated === "success") {
    return <Redirect to={Routes.ORDERS} />;
  }

  return (
    <div className={s["products-cart"]}>
      {productsAddedToCart.length === 0 ? (
        <div className={s.emptycart}>
          <img src={EmptyCart} />
        </div>
      ) : (
        <>
          <div className={s["products-cart__box"]}>
            {productsAddedToCart.map((item) => {
              return <ProductInCart item={item} key={item.product.id} />;
            })}
          </div>

          <div className={s["products-cart__total"]} onClick={makeOrder}>
            ORDER: {formatMoney(allItemsInCartSum)}
          </div>
        </>
      )}
    </div>
  );
};
