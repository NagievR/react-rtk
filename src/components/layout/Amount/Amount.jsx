import React, { useState, useEffect } from "react";
import Button from "../../elements/Button/Button";
import s from "./amount.module.scss";

const Amount = ({ min = 1, current, callback }) => {
  const [currentAmount, setCurrentAmount] = useState(+current || 1);
  const isDecrementAllowed = currentAmount > min;

  useEffect(() => {
    callback(currentAmount);
    // eslint-disable-next-line
  }, [currentAmount]);

  const increment = () => {
    setCurrentAmount(currentAmount + 1);
  };

  const decrement = () => {
    if (isDecrementAllowed) {
      setCurrentAmount(currentAmount - 1);
    }
  };

  return (
    <div className={s.wrap}>
      <div className={s.elem}>
        <Button text="-1" callback={decrement} disabled={!isDecrementAllowed} />
      </div>
      <div className={s.elem}>{currentAmount}</div>
      <div className={s.elem}>
        <Button text="+1" callback={increment} />
      </div>
    </div>
  );
};

export default Amount;
