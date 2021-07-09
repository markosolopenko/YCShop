import { getAllItemsInCartSum, getProductsAddedToCart } from "features/products/selectors";
import { formatMoney } from "helpers/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import { createNewOrderThunk } from "../../features/orders/thunks";
import { Routes } from "../../constants/routes";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const productsAddedToCart = useSelector(getProductsAddedToCart);
  const allItemsInCartSum = useSelector(getAllItemsInCartSum);
  const dispatch = useDispatch();

  const makeOrder = () => {
    dispatch(
      createNewOrderThunk(
        productsAddedToCart.map((item) =>
          Object({ productId: item.product.id, count: item.amount })
        )
      )
    );
  };

  return (
    <div className={s["products-cart"]}>
      <div className={s["products-cart__box"]}>
        {productsAddedToCart.map((item) => {
          return <ProductInCart item={item} key={item.product.id} />;
        })}
      </div>
      <Link to={Routes.ORDERS}>
        <div className={s["products-cart__total"]} onClick={makeOrder}>
          ORDER: {formatMoney(allItemsInCartSum)}
        </div>
      </Link>
    </div>
  );
};
