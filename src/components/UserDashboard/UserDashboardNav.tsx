import { Alignment, Button, Classes, Menu, MenuDivider, MenuItem, Navbar, Popover, Position } from '@blueprintjs/core';
import React, { FunctionComponent, useState } from 'react';
import Avatar from 'react-avatar';
import { Redirect } from 'react-router';
// @ts-ignore
import variables from '../../index.scss';
import { DashboardContextConsumer } from '../Admin/Dashboard/DashboardContext';
import '../Navbar/navbar.scss';

const UserDashboardNav: FunctionComponent = () => {
	const [allDocuments, setAllDocuments] = useState<boolean>(false);

	if (allDocuments) {
		return <Redirect to="/allDocuments" />;
	}
	return (
		<DashboardContextConsumer>
			{(dashboardContext) => (
				<Navbar>
					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading>
							<Button
								icon={dashboardContext?.isMenuOpen ? 'menu-closed' : 'menu-open'}
								minimal
								onClick={() => {
									dashboardContext?.stateChangeHandler({ isOpen: !dashboardContext?.isMenuOpen });
								}}
							/>
						</Navbar.Heading>
						<Navbar.Divider />
						<Popover
							content={
								<Menu className={Classes.ELEVATION_1}>
									<MenuItem icon="updated" text="Recent Documents" />
									<MenuItem icon="document" text="All Documents" onClick={() => setAllDocuments(true)} />
									<MenuItem icon="new-text-box" text="New Document" />
								</Menu>
							}
							position={Position.BOTTOM_LEFT}
							minimal
						>
							<Button className="bp3-minimal" icon="document" text="Documents" />
						</Popover>
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>
						<Popover
							content={
								<Menu className={Classes.ELEVATION_1}>
									<MenuItem icon="user" text="Profile" />
									<MenuItem icon="cog" text="Settings" />
									<MenuItem icon="lifesaver" text="Support" />
									<MenuDivider />
									<MenuItem icon="power" text="Logout" />
								</Menu>
							}
							onOpening={() => dashboardContext?.stateChangeHandler({ isOpen: false })}
							position={Position.BOTTOM}
						>
							<Avatar name="Admin User" round={true} size={'40'} color={variables.greenColor} className="nav-avatar" />
						</Popover>
					</Navbar.Group>
				</Navbar>
			)}
		</DashboardContextConsumer>
	);
};

export default UserDashboardNav;
