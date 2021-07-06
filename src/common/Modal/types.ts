import React from "react";

enum ButtonTypes {
  "button",
  "submit",
  "reset",
  undefined,
}

export interface IPropsModal {
  title: string;
  children: React.ReactNode;
  buttons: {
    text: string;
    style: string;
  }[];
  onSubmit: () => void;
  handleCancelClick: () => void;
}
