import React, {FunctionComponent, useState} from 'react';
import {Button, Callout, Card, Elevation, FormGroup, InputGroup, Intent, H4} from '@blueprintjs/core';
import {Box, Flex} from 'reflexbox';
import {userIcon} from '../utils/IconsComponent';
import {Redirect} from 'react-router';

const ForgotPassword: FunctionComponent = () => {

	const [username, setUsername] = useState<string>('');
	const [isInvalidLoginInfo, setIsInvalidLoginInfo] = useState<boolean>(false);
	const [backToLogin, setBackToLogin] = useState<boolean>(false);

	const handleReset = () => {
		if(!username) {
			setIsInvalidLoginInfo(true)
		} else {
			setIsInvalidLoginInfo(false)
		}
	}

	if(backToLogin) {
		return <Redirect to='/' />
	}
	return (
		<div className="container">
			<div className="justify-content-center row">
				<div className="col-lg-5">
					<Card interactive={true} elevation={Elevation.TWO}>
						<div className="p-4 position-relative">
							<H4>Forgot your password?</H4>
							<p>If you have forgotten your password, please enter your account's username or email address below and click the "Reset my password" button. You will receive a link in your registered email address to reset your password.</p>
							{isInvalidLoginInfo && <Callout intent={Intent.DANGER}>Username or password is incorrect.</Callout>}
							<FormGroup label="Username/Email">
								<InputGroup
									intent={isInvalidLoginInfo ? Intent.DANGER : Intent.PRIMARY}
									value={username}
									rightElement={userIcon}
									round
									onChange={(e: any) => setUsername(e.currentTarget.value)}
								/>
							</FormGroup>
							<Flex flexWrap="wrap">
								<Box width={[1, 1 / 2]} p={3}>
									<Button intent={Intent.PRIMARY} onClick={handleReset}>
										Reset my password
									</Button>
								</Box>
								<Box width={[1, 1 / 2]} p={3}>
									<Button minimal onClick={() => setBackToLogin(true)}>Back to Login</Button>
								</Box>
							</Flex>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword;