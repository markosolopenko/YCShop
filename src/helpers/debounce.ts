/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: any) => void) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, delay);
  };
};
