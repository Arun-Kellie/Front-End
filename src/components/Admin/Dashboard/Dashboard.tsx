import { Card, Elevation, H2 } from '@blueprintjs/core';
import { ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { map, uniqueId } from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import ScrollLock from 'react-scrolllock';

import { Pie } from 'react-chartjs-2';
// @ts-ignore
import variables from '../../../index.scss';
import { chartColors, chartOptions, lightenDarkenColor } from '../../../utils/util';
import NavbarComponent from '../../Navbar/NavbarComponent';
import Grid from '../../shared/Grid';
import { dashboardConstants } from './dashboardConstants';
import { DashboardContextConsumer, DashboardContextProvider } from './DashboardContext';
import AdminSidePanel from './SidePanel';
import './sidepanel.scss';

const chartData: ChartData = {
	labels: ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5', 'Department 6'],
	datasets: [
		{
			data: [300, 50, 100, 250, 120, 63],
			backgroundColor: chartColors,
			hoverBackgroundColor: map(chartColors, (color: string) => {
				return lightenDarkenColor(color, -20);
			}),
		},
	],
};

const AdminDashboardProvider = () => {
	const [menuOpenState, setMenuOpenState] = useState(false);

	return (
		<DashboardContextProvider
			value={{
				isMenuOpen: menuOpenState,
				toggleMenu: () => setMenuOpenState(!menuOpenState),
				stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
			}}
		>
			<AdminDashboard />
		</DashboardContextProvider>
	);
};

const AdminDashboard: FunctionComponent = () => {
	return (
		<DashboardContextConsumer>
			{(dashboardContext) => (
				<div id="outer-container">
					<NavbarComponent />
					<AdminSidePanel />
					<ScrollLock isActive={dashboardContext?.isMenuOpen}>
						<div
							className={`container-fluid page-content fade-in-up ${
								dashboardContext?.isMenuOpen && 'mainPanelContent'
							} `}
							id="page-wrap"
						>
							<div className="row">
								{map(dashboardConstants.cardNames, (cardName) => (
									<div key={uniqueId()} className="col-12 col-sm-6 col-lg-4 mb-4">
										<Card elevation={Elevation.TWO} style={{ backgroundColor: variables[cardName.backgroundColor] }}>
											<H2 className="m-b-5 font-strong" style={{ color: variables[cardName.color] }}>
												{cardName.count}
											</H2>
											<div className="m-b-5" style={{ color: variables[cardName.color] }}>
												{cardName.name}
											</div>
										</Card>
									</div>
								))}
							</div>
							<div className="row">
								<div className="col-12 col-sm-6 col-lg-8">
									<Grid />
								</div>
								<div className="col-12 col-sm-6 col-lg-4">
									<H2 className="pb-0 card-header">Files</H2>
									<Pie data={chartData} options={chartOptions} />
								</div>
							</div>
						</div>
					</ScrollLock>
				</div>
			)}
		</DashboardContextConsumer>
	);
};

export default AdminDashboardProvider;
