import { useCallback, useState } from "react";
import { formatMoney } from "helpers/formatMoney";
import { operators } from "constants/operators";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, changeCartCountsAtion } from "features/products/productsSlice";
import { getProduct, getStatus } from "features/products/selectors";
import { PENDING } from "constants/status";
import { Loader } from "components/Loader/Loader";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Counter } from "../../components/Counter/Counter";
import s from "./ProductDetails.module.scss";

export const ProductDetails: React.FC = () => {
  const product = useSelector(getProduct);
  const status = useSelector(getStatus);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { plus } = operators;

  const handelInputChange = useCallback((inputValue: number) => {
    setValue(inputValue);
  }, []);

  const handleAddToCartClick = useCallback(() => {
    if (value > 0 && product) {
      dispatch(addToCartAction({ product, operator: plus, amount: value }));
      dispatch(changeCartCountsAtion());
    }
    setValue(0);
  }, [value]);

  if (status === PENDING) {
    return <Loader />;
  }

  return (
    <div className={s["prodcut-detils"]}>
      {product ? (
        <div className={s["prodcut-detils__product"]}>
          <div className={s["prodcut-detils__product__top"]}>
            <div className={s["prodcut-detils__product__top__item"]}>
              <span className={s["prodcut-detils__product__top__item__span"]}>Name: </span>
              {product.name}
            </div>
            <div className={s["prodcut-detils__product__top__item"]}>
              <span className={s["prodcut-detils__product__top__item__span"]}>Price: </span>
              {formatMoney(product.price)}
            </div>
          </div>
          <div className={s["prodcut-detils__product__body"]}>
            <div className={s["prodcut-detils__product__body__info"]}>
              <div className={s["prodcut-detils__product__body__info__item"]}>
                <span className={s["prodcut-detils__product__body__info__item__span"]}>
                  Origin:
                </span>
                {product.origin.toUpperCase()}
              </div>
              <div className={s["prodcut-detils__product__body__info__item"]}>
                <span className={s["prodcut-detils__product__body__info__item__span"]}>
                  CreatedAt:
                </span>
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Counter startValue={value} onChange={handelInputChange} />
            <div
              className={s["prodcut-detils__product__body__addToCart"]}
              onClick={handleAddToCartClick}
            >
              <div className={s["prodcut-detils__product__body__addToCart__button"]}>
                ADD TO CART
              </div>
              <Cart className={s["prodcut-detils__product__body__addToCart__cart"]} />
            </div>
          </div>
        </div>
      ) : (
        <div>NO Products ADDED</div>
      )}
    </div>
  );
};
