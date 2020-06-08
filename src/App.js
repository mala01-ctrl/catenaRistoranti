import React from "react";
import "./App.css";
import Navbar from "./structure/navbar";
import Footer from "./structure/footer";
import Homepage from "./homepage/homepage";
import { Route, Switch, Redirect } from "react-router-dom";
import MainRistoranti from "./ristoranti/mainRistoranti";
import Ristorante from "./ristoranti/ristorante";
import RegisterCustomer from "./cliente/registerCustomer";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route path="/ristoranti/:id" component={Ristorante} />
        <Route path="/ristoranti" component={MainRistoranti} />
        <Route path="/registrazione" component={RegisterCustomer} />
        <Redirect from="/" exact to="/home" />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
