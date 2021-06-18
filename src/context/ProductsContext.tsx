import React, { createContext, Reducer, useReducer } from "react";

import { ADD_TO_CART, FETCH_PRODUCTS, FETCH_PRODUCT_BY_ID, LOAD_MORE } from "actionTypes/products";
import { addToCart } from "helpers/addToCart";
import { IProductsContext } from "./types";
import { IProduct, IProducts } from "../common/types/types";

type Action =
  | { type: "FETCH_PRODUCTS"; payload: IProducts }
  | { type: "FETCH_PRODUCT_BY_ID"; payload: IProduct }
  | { type: "ADD_TO_CART"; payload: IProduct }
  | { type: "LOAD_MORE" };

const initialState: IProductsContext = {
  products: [],
  product: null,
  productsAddedToCart: [],
  currentPage: 1,
  perPage: 50,
  totalItems: 0,
};

export const ProductsContextState = createContext<IProductsContext>(initialState);

export const ProductsContextDispatch = createContext<any>(null);

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      const { items, totalItems } = action.payload;
      return {
        ...state,
        products: [...state.products, ...items],
        totalItems: totalItems,
      };
    }
    case FETCH_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        productsAddedToCart: addToCart(state.productsAddedToCart, action.payload),
      };
    case LOAD_MORE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    default:
      return state;
  }
};

export const ProductsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(productsReducer, initialState);
  return (
    <ProductsContextState.Provider value={state}>
      <ProductsContextDispatch.Provider value={dispatch}>
        {children}
      </ProductsContextDispatch.Provider>
    </ProductsContextState.Provider>
  );
};
