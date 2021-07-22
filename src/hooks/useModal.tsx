import { useCallback, useState } from "react";

type ReturnType = {
  setToogle: () => void;
  setOpen: () => void;
  setClose: () => void;
  state: boolean;
};

export const useModal = (isOpen: boolean): ReturnType => {
  const [state, setState] = useState(isOpen);

  const setOpen = useCallback(() => {
    setState(true);
  }, []);
  const setClose = useCallback(() => {
    setState(false);
  }, []);
  const setToogle = useCallback(() => {
    setState(!state);
  }, []);

  return { setToogle, setOpen, setClose, state };
};
