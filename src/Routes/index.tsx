import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from "../App";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const Routes: FunctionComponent = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/forgot" component={ForgotPassword}/>
        </Switch>
    </Router>
)

export default Routes;
