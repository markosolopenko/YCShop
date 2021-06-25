import { operators } from "constants/operators";
import { addToCartAction, changeCartCountsAtion } from "features/products/productsSlice";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

  const { plus, minus } = operators;

  useEffect(() => {
    onChange(counter);
  }, [counter]);

  const handleMinusClick = useCallback(() => {
    if (counter > 1) {
      setCounter(counter - 1);

      if (addToCart) {
        dispatch(addToCartAction({ product, operator: minus, amount: 1 }));
        dispatch(changeCartCountsAtion({ count: 1, sum: product.price, operator: minus }));
      }
    }
  }, [counter]);

  const handlePlusClick = useCallback(() => {
    setCounter(counter + 1);

    if (addToCart) {
      dispatch(addToCartAction({ product, operator: plus, amount: 1 }));
      dispatch(changeCartCountsAtion({ count: 1, sum: product.price, operator: plus }));
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
