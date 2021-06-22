import { ADD_TO_CART, CHANGE_CART_COUNTS } from "actionTypes/products";
import { ProductsContextDispatch } from "context/ProductsContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IProduct } from "../../common/types/types";
import s from "./Counter.module.scss";

type IProps = {
  startValue: number;
  product: IProduct;
  addToCart: boolean;
  onChange: (inputValue: number) => void;
};

export const Counter: React.FC<IProps> = ({ startValue, product, addToCart, onChange }) => {
  const [counter, setCounter] = useState(startValue);

  const dispatch = useContext(ProductsContextDispatch);

  useEffect(() => {
    onChange(counter);
  }, [counter]);

  const handleMinusClick = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      dispatch({ type: ADD_TO_CART, payload: { product, operator: "-", amount: 1 } });

      if (addToCart) {
        dispatch({
          type: CHANGE_CART_COUNTS,
          payload: { count: 1, sum: product.price, operator: "-" },
        });
      }
    }
  };
  const handlePlusClick = () => {
    setCounter(counter + 1);
    dispatch({ type: ADD_TO_CART, payload: { product, operator: "+", amount: 1 } });

    if (addToCart) {
      dispatch({
        type: CHANGE_CART_COUNTS,
        payload: { count: 1, sum: product.price, operator: "+" },
      });
    }
  };
  return (
    <div className={s.counter}>
      <button onClick={handleMinusClick} className={s.counter__minus}>
        -
      </button>
      <input
        className={s.counter__amount}
        value={counter}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCounter(Number(e.target.value))}
      />
      <button onClick={handlePlusClick} className={s.counter__plus}>
        +
      </button>
    </div>
  );
};
