import { ADD_TO_CART, CHANGE_CART_COUNTS } from "actionTypes/products";
import { ProductsContextDispatch } from "context/ProductsContext";
import { ChangeEvent, useContext, useState } from "react";
import { IProduct } from "../../common/types/types";
import s from "./Counter.module.scss";

type IProps = {
  startValue: number;
  product: IProduct;
};

export const Counter: React.FC<IProps> = ({ startValue, product }) => {
  const [counter, setCounter] = useState(startValue);
  const handleChange = (e: ChangeEvent) => {
    console.log(e);
  };
  const dispatch = useContext(ProductsContextDispatch);
  const handleMinusClick = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      dispatch({ type: ADD_TO_CART, payload: { product, operator: "-" } });
      dispatch({
        type: CHANGE_CART_COUNTS,
        payload: { count: 1, sum: product.price, operator: "-" },
      });
    }
  };
  const handlePlusClick = () => {
    setCounter(counter + 1);
    dispatch({ type: ADD_TO_CART, payload: { product, operator: "+" } });
    dispatch({
      type: CHANGE_CART_COUNTS,
      payload: { count: 1, sum: product.price, operator: "+" },
    });
  };
  return (
    <div className={s.counter}>
      <button onClick={handleMinusClick} className={s.counter__minus}>
        -
      </button>
      <input className={s.counter__amount} value={counter} onChange={handleChange} />
      <button onClick={handlePlusClick} className={s.counter__plus}>
        +
      </button>
    </div>
  );
};
