import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { Routes } from "../constants/routes";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";

import { Header } from "../components/Header/Header";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { PRODUCTS, PRODUCT_DEATAILS } = Routes;
  return (
    <div className={s.app}>
      <Header />
      <Switch>
        <Route path={PRODUCTS} component={Products} />
        <Route path={PRODUCT_DEATAILS} component={ProductDetails} />

        <Route path="/">
          <Redirect to={PRODUCTS} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
