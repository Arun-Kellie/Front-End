import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboardProvider from '../Admin/Dashboard/Dashboard';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Landing from '../Landing/Landing';

const Routes: FunctionComponent = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route path="/forgot" component={ForgotPassword} />
			<Route path="/admin" component={AdminDashboardProvider} />
		</Switch>
	</Router>
);

export default Routes;
