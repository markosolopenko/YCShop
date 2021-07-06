import React from "react";

enum IButtons {
  "submit",
  "reset",
  "delete",
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
