import { useContext, useState } from "react";
import { ProductsContextDispatch, ProductsContextState } from "context/ProductsContext";
import { IProduct } from "common/types/types";
import { CHANGE_CART_COUNTS } from "actionTypes/products";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Counter } from "../../components/Counter/Counter";
import s from "./ProductDetails.module.scss";

export const ProductDetails: React.FC = () => {
  const [value, setValue] = useState(0);
  const state = useContext(ProductsContextState);
  const dispatch = useContext(ProductsContextDispatch);
  const { product } = state;

  const handelInputChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleAddToCartClick = (product: IProduct) => {
    dispatch({
      type: CHANGE_CART_COUNTS,
      payload: { count: value, sum: value * product.price, operator: "+" },
    });
  };

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
              {product.price}$
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
            <Counter
              startValue={1}
              product={product}
              addToCart={false}
              onChange={handelInputChange}
            />
            <div
              className={s["prodcut-detils__product__body__addToCart"]}
              onClick={() => handleAddToCartClick(product)}
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
