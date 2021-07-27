import React from "react";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Register} exact />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
