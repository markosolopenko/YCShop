import { ADD_TO_CART, CHANGE_CART_COUNTS } from "actionTypes/products";
import { operators } from "constants/operators";
import { ProductsContextDispatch } from "context/ProductsContext";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { IProduct } from "../../types/types";
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

  const { plus, minus } = operators;

  useEffect(() => {
    onChange(counter);
  }, [counter]);

  const handleMinusClick = useCallback(() => {
    if (counter > 1) {
      setCounter(counter - 1);

      if (addToCart) {
        dispatch({ type: ADD_TO_CART, payload: { product, operator: minus, amount: counter } });
        dispatch({
          type: CHANGE_CART_COUNTS,
          payload: { count: 1, sum: product.price, operator: minus },
        });
      }
    }
  }, [counter]);

  const handlePlusClick = useCallback(() => {
    setCounter(counter + 1);

    if (addToCart) {
      dispatch({ type: ADD_TO_CART, payload: { product, operator: plus, amount: 1 } });
      dispatch({
        type: CHANGE_CART_COUNTS,
        payload: { count: 1, sum: product.price, operator: plus },
      });
    }
  }, [counter]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCounter(Number(e.target.value));
  };

  return (
    <div className={s.counter}>
      <button onClick={handleMinusClick} className={s.counter__minus}>
        -
      </button>
      <input className={s.counter__amount} value={startValue} onChange={handleInputChange} />
      <button onClick={handlePlusClick} className={s.counter__plus}>
        +
      </button>
    </div>
  );
};
