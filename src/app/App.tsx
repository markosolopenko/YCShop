import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { Routes } from "constants/routes";

import { Header } from "../components/Header/Header";
import s from "./App.module.scss";

export const App: React.FC = () => {
  const { PRODUCTS } = Routes;
  return (
    <div className={s.app}>
      <Header />
      <Switch>
        <Route path={PRODUCTS} component={Products} />

        <Route path="/">
          <Redirect to={PRODUCTS} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
