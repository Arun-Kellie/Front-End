import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import AdminDashboard from "../Admin/Dashboard/Dashboard";

const Routes: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/admin" component={AdminDashboard} />
    </Switch>
  </Router>
);

export default Routes;
