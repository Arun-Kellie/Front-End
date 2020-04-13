import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import AdminDashboard from "../Admin/Dashboard/Dashboard";
import Landing from '../Landing/Landing';

const Routes: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/admin" component={AdminDashboard} />
    </Switch>
  </Router>
);

export default Routes;
