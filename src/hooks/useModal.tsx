import { useState } from "react";

type ReturnType = {
  setToogle: () => void;
  setOpen: () => void;
  setClose: () => void;
  state: boolean;
};

export const useModal = (isOpen: boolean): ReturnType => {
  const [state, setState] = useState(isOpen);

  const setOpen = () => {
    setState(true);
  };
  const setClose = () => {
    setState(false);
  };
  const setToogle = () => {
    setState(!state);
  };

  return { setToogle, setOpen, setClose, state };
};
