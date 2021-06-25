import { useCallback } from "react";
import { formatMoney } from "helpers/formatMoney";
import { operators } from "constants/operators";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "core/store";
import { changeCartCountsAtion, deleteFromCart } from "features/products/productsSlice";
import { IProductsInCart } from "../../types/types";
import { Counter } from "../../components/Counter/Counter";
import { ReactComponent as DeleteIcon } from "../../assets/trash-alt-solid.svg";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const { minus } = operators;

  const { productsAddedToCart, allItemsInCartSum } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  const handleDeleteProduct = useCallback((item: IProductsInCart) => {
    dispatch(deleteFromCart(item.product.id));
    dispatch(
      changeCartCountsAtion({
        count: item.amount,
        sum: item.amount * item.product.price,
        operator: minus,
      })
    );
  }, []);

  const handleInputChange = useCallback((inputValue: number) => {
    return inputValue;
  }, []);
  return (
    <div className={s["products-cart"]}>
      <div className={s["products-cart__box"]}>
        {productsAddedToCart.map((item) => {
          return (
            <div className={s["products-cart__box__item"]} key={item.product.id}>
              <div className={s["products-cart__box__item__name"]}>
                <span>Name: </span>
                {item.product.name}
              </div>
              <Counter
                startValue={item.amount}
                product={item.product}
                addToCart={true}
                onChange={handleInputChange}
              />
              <div className={s["products-cart__box__item__total"]}>
                {item.product.price}$ x {item.amount} =
                {formatMoney(item.product.price * item.amount)}
              </div>
              <div
                className={s["products-cart__box__item__delete"]}
                onClick={() => handleDeleteProduct(item)}
              >
                <DeleteIcon className={s["products-cart__box__item__delete__icon"]} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={s["products-cart__total"]}>Total: {formatMoney(allItemsInCartSum)}</div>
    </div>
  );
};
