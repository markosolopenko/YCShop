import { operators } from "constants/operators";
import { addToCartAction, changeCartCountsAtion } from "features/products/productsSlice";
import { ChangeEvent, useCallback } from "react";
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
  const dispatch = useDispatch();

  const { plus, minus } = operators;

  const handleMinusClick = useCallback(() => {
    if (startValue > 1) {
      onChange(startValue - 1);

      if (addToCart) {
        dispatch(addToCartAction({ product, operator: minus, amount: 1 }));
        dispatch(changeCartCountsAtion());
      }
    }
  }, [startValue]);

  const handlePlusClick = useCallback(() => {
    onChange(startValue + 1);

    if (addToCart) {
      dispatch(addToCartAction({ product, operator: plus, amount: 1 }));
      dispatch(changeCartCountsAtion());
    }
  }, [startValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
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
