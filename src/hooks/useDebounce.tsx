import { debounce } from "helpers/debounce";

export const useDebounce = (callback: (value: never) => void): ((value?: unknown) => void) => {
  return debounce(callback, 1000);
};
