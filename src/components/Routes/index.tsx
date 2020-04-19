import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboardProvider from '../Admin/Dashboard/Dashboard';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Landing from '../Landing/Landing';
import UserDashboard from '../UserDashboard/UserDashboard';

const Routes: FunctionComponent = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route path="/forgot" component={ForgotPassword} />
			<Route path="/admin" component={AdminDashboardProvider} />
			<Route path="/userDashboard" component={UserDashboard} />
		</Switch>
	</Router>
);

export default Routes;
