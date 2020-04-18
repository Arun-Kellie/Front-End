import * as React from 'react';

export interface DashboardContextInterface {
	isMenuOpen: boolean;
	toggleMenu: () => void;
	stateChangeHandler: (newState: { isOpen: boolean }) => void;
}

export const dashboardContext = React.createContext<DashboardContextInterface | null>(null);

export const DashboardContextProvider = dashboardContext.Provider;

export const DashboardContextConsumer = dashboardContext.Consumer;
