import { Button, Callout, Card, Elevation, FormGroup, InputGroup, Intent, Tooltip } from '@blueprintjs/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Redirect } from 'react-router-dom';
import { userIcon } from '../../utils/IconsComponent';

interface LoginFormProps {
	handleClickSignUp: (e: boolean) => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {
	const { t, i18n } = useTranslation(['translation']);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoggedinAdmin, setLoggedInAdmin] = useState<boolean>(false);
	const [isLoggedinUser, setLoggedInUser] = useState<boolean>(false);
	const [isForgotPassword, setForgotPassword] = useState<boolean>(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
	const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
	const [isInvalidLoginInfo, setIsInvalidLoginInfo] = useState<boolean>(false);
	const [isCapsLockEnabled, setCapsLockEnabled] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener('keyup', (event) => {
			/**
			 * If "caps lock" is pressed, display the warning text
			 */
			if (event.getModifierState('CapsLock')) {
				setCapsLockEnabled(true);
			} else {
				setCapsLockEnabled(false);
			}
		});
	}, []);

	const handleLockClick = () => setShowPassword(!showPassword);

	const lockButton = (
		<Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
			<Button
				icon={showPassword ? 'unlock' : 'lock'}
				intent={Intent.WARNING}
				minimal={true}
				onClick={handleLockClick}
			/>
		</Tooltip>
	);

	const handleSignUp = () => {
		props.handleClickSignUp(true);
	};

	const _handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			handleLogin();
		}
	};

	const handleLogin = () => {
		if (!username) {
			setIsInvalidUsername(true);
		} else {
			setIsInvalidUsername(false);
		}
		if (!password) {
			setIsInvalidPassword(true);
		} else {
			setIsInvalidPassword(false);
		}
		if (username === 'test' && password === 'password') {
			setLoggedInAdmin(true);
			setIsInvalidLoginInfo(false);
		} else {
			setIsInvalidLoginInfo(true);
		}

		if (username === 'testuser' && password === 'password') {
			setLoggedInUser(true);
			setIsInvalidLoginInfo(false);
		} else {
			setIsInvalidLoginInfo(true);
		}
	};

	if (isForgotPassword) {
		return <Redirect push to="/forgot" />;
	}
	if (isLoggedinAdmin) {
		return <Redirect push to="/admin" />;
	}

	if (isLoggedinUser) {
		return <Redirect push to="/userDashboard" />;
	}

	return (
		<div className="container">
			<div className="justify-content-center row">
				<button onClick={() => changeLanguage('de')}>{t('translation:de')}</button>
				<button onClick={() => changeLanguage('en')}>{t('translation:en')}</button>
				<Card elevation={Elevation.TWO}>
					<div className="p-4 position-relative">
						{isInvalidLoginInfo && <Callout intent={Intent.DANGER}>Username or password is incorrect.</Callout>}
						<FormGroup label="Username/Email">
							<InputGroup
								intent={isInvalidUsername ? Intent.DANGER : Intent.PRIMARY}
								value={username}
								rightElement={userIcon}
								round
								onChange={(e: any) => setUsername(e.currentTarget.value)}
							/>
						</FormGroup>
						<FormGroup
							label="Password"
							helperText={isCapsLockEnabled && <p style={{ color: '#A82A2A' }}>Caps Lock is enabled.</p>}
						>
							<InputGroup
								placeholder="Enter your password"
								rightElement={lockButton}
								intent={isInvalidPassword ? Intent.DANGER : Intent.PRIMARY}
								type={showPassword ? 'text' : 'password'}
								value={password}
								round
								onChange={(e: any) => setPassword(e.currentTarget.value)}
								onKeyDown={_handleKeyDown}
							/>
						</FormGroup>
						<FormGroup>
							<Button intent={Intent.PRIMARY} onClick={handleLogin}>
								Login
							</Button>
						</FormGroup>
						<div className="row">
							<div className="col">
								<Button intent={Intent.PRIMARY} onClick={handleSignUp}>
									Sign up
								</Button>
							</div>
							<div className="col">
								<Button minimal onClick={() => setForgotPassword(true)}>
									Forgot your password?
								</Button>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default LoginForm;
