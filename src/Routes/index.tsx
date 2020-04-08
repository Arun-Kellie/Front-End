import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from "../App";
import SignUp from "../SignUp/SignUp";

const Routes: FunctionComponent = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/signup" component={SignUp}/>
        </Switch>
    </Router>
)

export default Routes;
