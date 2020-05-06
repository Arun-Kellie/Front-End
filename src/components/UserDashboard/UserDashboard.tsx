import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Router, Switch, withRouter } from 'react-router-dom';
import AllDocuments from './AllDocuments';
import UserDashboardNav from './UserDashboardNav';

const UserDashboard: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
	console.log('props', props);
	return (
		<div id="outer-container">
			<UserDashboardNav />
			<Router history={props.history}>
				<Switch>
					<Route path="/allDocuments" component={AllDocuments} />
				</Switch>
			</Router>
		</div>
	);
};

export default withRouter(UserDashboard);
