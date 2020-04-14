import * as React from "react";

export interface UserContextInterface {
	isUserLoggedIn: boolean;
	isAdmin: boolean;
	stateChangeHandler: (newState: {isUserLoggedIn: boolean, isAdmin: boolean}) => void;
}

export const userContext = React.createContext<UserContextInterface | null>(null);

export const UserContextProvider = userContext.Provider;

export const UserContextConsumer = userContext.Consumer;
