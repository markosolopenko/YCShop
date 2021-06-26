import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { Routes } from "../constants/routes";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { ProductsCart } from "../pages/ProductsCart/ProductsCart";

import { Header } from "../components/Header/Header";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { PRODUCTS, PRODUCT_DEATAILS, PRODUCTS_CART } = Routes;

  return (
    <div className={s.app}>
      <Header />
      <Switch>
        <Route path={PRODUCTS} component={Products} />
        <Route path={PRODUCT_DEATAILS} component={ProductDetails} />
        <Route path={PRODUCTS_CART} component={ProductsCart} />

        <Redirect to={PRODUCTS} />
      </Switch>
    </div>
  );
};

export default App;
