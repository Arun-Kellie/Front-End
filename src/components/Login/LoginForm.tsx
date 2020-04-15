import { Button, Callout, Card, Elevation, FormGroup, InputGroup, Intent, Tooltip } from '@blueprintjs/core';
import React, { FunctionComponent, useState } from 'react';

import { Redirect } from 'react-router-dom';
import { userIcon } from '../../utils/IconsComponent';
import { userDetails } from '../../utils/loginDetails';

interface LoginFormProps {
	handleClickSignUp: (e: boolean) => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoggedin, setLoggedIn] = useState<boolean>(false);
	const [isForgotPassword, setForgotPassword] = useState<boolean>(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
	const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
	const [isInvalidLoginInfo, setIsInvalidLoginInfo] = useState<boolean>(false);

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
		if (username === userDetails.name && password === userDetails.password) {
			setLoggedIn(true);
			setIsInvalidLoginInfo(false);
		} else {
			setIsInvalidLoginInfo(true);
		}
	};

	if (isForgotPassword) {
		return <Redirect push to="/forgot" />;
	}
	if (isLoggedin) {
		return <Redirect push to="/admin" />;
	}
	return (
		<div className="container">
			<div className="justify-content-center row">
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
						<FormGroup label="Password">
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
