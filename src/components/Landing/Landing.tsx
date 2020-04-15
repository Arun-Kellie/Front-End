import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as SierraLeoneMap } from '../../assets/img/sierra-leone.svg';
import LoginForm from '../Login/LoginForm';
import SignUp from '../SignUp/SignUp';
import { UserContextProvider } from '../UserContext/UserContext';
import './landing.scss';

const LandingContextComponent = () => (
	<UserContextProvider
		value={{
			isUserLoggedIn: false,
			isAdmin: false,
		}}
	>
		<Landing />
	</UserContextProvider>
);

const Landing: FunctionComponent = () => {
	const [goToSignUpPage, setToSignUpPage] = useState<boolean>(false);

	const handleClickSignUp = (e: boolean) => {
		setToSignUpPage(e);
	};

	const handleCancelSignUp = (e: boolean) => {
		setToSignUpPage(e);
	};

	return (
		<div className="container pt-4">
			<div className="row">
				<div className="col-5">
					<SierraLeoneMap />
				</div>
				<div className="col-7">
					{!goToSignUpPage ? (
						<LoginForm handleClickSignUp={handleClickSignUp} />
					) : (
						<SignUp handleCancelSignUp={handleCancelSignUp} />
					)}
				</div>
			</div>
		</div>
	);
};

export default LandingContextComponent;
