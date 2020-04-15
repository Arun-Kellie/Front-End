import { Button, Callout, Card, Elevation, FormGroup, H4, InputGroup, Intent } from '@blueprintjs/core';
import React, { FunctionComponent, useState } from 'react';
import { Redirect } from 'react-router';
import AppToaster from '../../utils/AppToaster';
import { userIcon } from '../../utils/IconsComponent';
import { userDetails } from '../../utils/loginDetails';

const ForgotPassword: FunctionComponent = () => {
	const [username, setUsername] = useState<string>('');
	const [isInvalidLoginInfo, setIsInvalidLoginInfo] = useState<boolean>(false);
	const [backToLogin, setBackToLogin] = useState<boolean>(false);

	const handleReset = () => {
		if (!username) {
			setIsInvalidLoginInfo(true);
		} else if (username !== userDetails.name) {
			AppToaster.show({ message: 'Enter a valid user name or password' });
		} else {
			AppToaster.show({ message: 'Email sent to reset password' });
			setIsInvalidLoginInfo(false);
		}
	};

	if (backToLogin) {
		return <Redirect to="/" />;
	}
	return (
		<div className="container">
			<div className="justify-content-center row">
				<div className="col-lg-5">
					<Card elevation={Elevation.TWO}>
						<div className="p-4 position-relative">
							<H4>Forgot your password?</H4>
							<p className="text-justify">
								If you have forgotten your password, please enter your account's username or email address below and
								click the "Reset my password" button. You will receive a link in your registered email address to reset
								your password.
							</p>
							{isInvalidLoginInfo && <Callout intent={Intent.DANGER}>Username is incorrect.</Callout>}
							<FormGroup label="Username/Email">
								<InputGroup
									intent={isInvalidLoginInfo ? Intent.DANGER : Intent.PRIMARY}
									value={username}
									rightElement={userIcon}
									round
									onChange={(e: any) => setUsername(e.currentTarget.value)}
								/>
							</FormGroup>
							<div className="row">
								<div className="col">
									<Button minimal onClick={() => setBackToLogin(true)}>
										Back to Login
									</Button>
								</div>
								<div className="col">
									<Button intent={Intent.PRIMARY} className="float-right" onClick={handleReset}>
										Reset my password
									</Button>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
