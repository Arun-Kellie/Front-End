import { FocusStyleManager } from '@blueprintjs/core';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './i18n';
import './index.scss';
import logo from './logo.svg';
import * as serviceWorker from './serviceWorker';

const Loader = () => (
	<div className="App">
		<img src={logo} className="App-logo" alt="logo" />
		<div>loading...</div>
	</div>
);

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
	<Suspense fallback={<Loader />}>
		<App />
	</Suspense>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
