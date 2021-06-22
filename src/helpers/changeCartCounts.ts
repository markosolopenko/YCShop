type ReturnType = {
  allItemsInCartAmount: number;
  allItemsInCartSum: number;
};

export const changeCartCounts = (
  count: number,
  sum: number,
  operator: string,
  current: { count: number; sum: number }
): ReturnType => {
  const result: ReturnType = {
    allItemsInCartAmount: current.count,
    allItemsInCartSum: current.sum,
  };
  if (operator === "+") {
    (result.allItemsInCartAmount += count), (result.allItemsInCartSum += sum);
  } else if (operator === "-") {
    (result.allItemsInCartAmount -= count), (result.allItemsInCartSum -= sum);
  }

  return result;
};
