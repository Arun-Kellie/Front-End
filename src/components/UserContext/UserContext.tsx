import * as React from 'react';

export interface UserContextInterface {
	isUserLoggedIn: boolean;
	isAdmin: boolean;
}

export const userContext = React.createContext<UserContextInterface | null>(null);

export const UserContextProvider = userContext.Provider;

export const UserContextConsumer = userContext.Consumer;
