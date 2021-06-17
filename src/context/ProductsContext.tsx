import React, { createContext, Reducer, useReducer } from "react";

import { FETCH_PRODUCTS } from "actionTypes/products";
import { IProductsContext } from "./types";
import { IProducts } from "../common/types/types";

type Action = { type: "FETCH_PRODUCTS"; payload: IProducts };

type Dispatch = (action: Action) => void;

const initialState: IProductsContext = {
  products: { page: 0, perPage: 0, totalItems: 0, items: [] },
};

export const ProductsContextState =
  createContext<IProductsContext>(initialState);

export const ProductsContextDispatch = createContext<{
  dispatch: Dispatch;
} | null>(null);

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const ProductsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(
    productsReducer,
    initialState
  );
  return (
    <ProductsContextState.Provider value={state}>
      <ProductsContextDispatch.Provider value={{ dispatch }}>
        {children}
      </ProductsContextDispatch.Provider>
    </ProductsContextState.Provider>
  );
};
