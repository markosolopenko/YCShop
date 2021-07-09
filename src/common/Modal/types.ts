import React from "react";

enum IButtons {
  "submit",
  "reset",
  "delete",
}

export interface IPropsModal {
  title: string;
  children: React.ReactNode;
  handleCancelClick: () => void;
}
