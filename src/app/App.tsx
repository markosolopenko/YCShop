import React from "react";

import { Route, Switch } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { Header } from "../components/Header/Header";

import s from "./App.module.scss";

export const App: React.FC = () => {
  return (
    <div className={s.app}>
      <Switch>
        <Header />

        <Route path="/products" component={Products} />
      </Switch>
    </div>
  );
};

export default App;
