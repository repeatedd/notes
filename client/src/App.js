import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { loadUser } from "./actions/authActions";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

function App(props) {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          {/* <Register></Register> */}
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/notes">
            <Container>
              <AddNote />
              <NotesList />
            </Container>
          </Route>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
