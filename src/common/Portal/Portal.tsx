import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { IPortal } from "./types";

import s from "./Portal.module.scss";

export const Portal: React.FC<IPortal> = ({
  className = "root-portal",
  element = "div",
  children,
}: IPortal) => {
  const [container] = useState(document.createElement(element));

  container.classList.add(className);

  useEffect(() => {
    document.body.appendChild(container);
    container.setAttribute("class", s.wrapperPortal);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.removeChild(container);
      document.body.style.overflow = "auto";
    };
  }, [container]);

  return createPortal(children, container);
};
