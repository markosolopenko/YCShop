import React from "react";

export interface IPropsModal {
  title: string;
  children: React.ReactNode;
  buttons: { text: string; style: string }[];
}
