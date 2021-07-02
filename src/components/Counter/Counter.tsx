import { ChangeEvent, useCallback } from "react";

import s from "./Counter.module.scss";

type IProps = {
  startValue: number;
  onChange: (inputValue: number) => void;
};

export const Counter: React.FC<IProps> = ({ startValue, onChange }) => {
  const handleMinusClick = useCallback(() => {
    if (startValue > 0) {
      onChange(startValue - 1);
    }
  }, [startValue]);

  const handlePlusClick = useCallback(() => {
    onChange(startValue + 1);
  }, [startValue]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  }, []);

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
