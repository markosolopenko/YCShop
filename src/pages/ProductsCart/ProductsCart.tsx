import { getAllItemsInCartSum, getProductsAddedToCart } from "features/products/selectors";
import { formatMoney } from "helpers/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import { selectIfOrderCreated } from "features/orders/selectors";
import { Redirect } from "react-router-dom";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import { createNewOrderThunk } from "../../features/orders/thunks";
import { clearCart } from "../../features/products/productsSlice";
import { Routes } from "../../constants/routes";
import EmptyCart from "../../assets/empty-cart.png";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const productsAddedToCart = useSelector(getProductsAddedToCart);
  const allItemsInCartSum = useSelector(getAllItemsInCartSum);
  const dispatch = useDispatch();
  const orderCreated = useSelector(selectIfOrderCreated);

  const makeOrder = () => {
    dispatch(
      createNewOrderThunk(
        productsAddedToCart.map((item) =>
          Object({ productId: item.product.id, count: item.amount })
        )
      )
    );
    dispatch(clearCart());
  };
  if (orderCreated) {
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
