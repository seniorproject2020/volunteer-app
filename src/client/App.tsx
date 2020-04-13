import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navigation from "./components/layout/Navigation";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { Container } from 'react-bootstrap';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/css/App.css'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwtDecode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends React.Component{
	render() {
    return (
      <Provider store={store}>
        <HashRouter>
        <Navigation />
          <Container>

            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
           
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Container>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;