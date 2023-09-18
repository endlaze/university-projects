import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ClientHome from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppNavbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Furniture from "./components/AddFurniture";
import store from 'store'
import Orders from "./pages/Orders";
import GeneralManager from "./pages/GeneralManager";
import ReportPage from "./pages/ReportPage";
import EmployeeReport from "./pages/EmployeeReport"
import Profile from "./pages/Profile"


const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/checkout">
            <Checkout/>
          </PrivateRoute>
          <PrivateRoute path="/addfurniture">
            <Furniture/>
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders/>
          </PrivateRoute>
          <Route path="/reports/all">
            <ReportPage/>
          </Route>
          <Route path="/reports/employee">
            <EmployeeReport/>
          </Route>
          <Route path="/admin">
            <GeneralManager />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/">
            <ClientHome />
          </PrivateRoute>
          
        </Switch>
    </Router>
  );
}

export default Routes;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth() ? (
          <>
            <AppNavbar></AppNavbar>
            {children}
          </>
          
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const auth = () => {
  const user = store.get('user')
  return user ? true : false
};