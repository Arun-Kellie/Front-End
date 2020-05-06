import React, { FunctionComponent, useContext, useEffect, useState } from 'react';

import {
	Button,
	Card,
	ControlGroup,
	Elevation,
	FormGroup,
	InputGroup,
	Intent,
	MenuItem,
	PopoverPosition,
	Tooltip,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { head, isEmpty, trimStart } from 'lodash';
import APICacheContext from '../../services/APICacheContext';
import AppToaster from '../../utils/AppToaster';
import { emailIcon, phoneIcon, userIcon } from '../../utils/IconsComponent';
import { formatPhone, isValidEmail } from '../../utils/util';
import { CountrySelectProps, ICountryProps } from './countrySelect';

interface SignUpProps {
	handleCancelSignUp: (e: boolean) => void;
}

const CountrySelect = Select.ofType<ICountryProps>();

const SignUp: FunctionComponent<SignUpProps> = (props: SignUpProps) => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
	const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
	const [selectedCountry, setSelectedCountry] = useState<ICountryProps | null>(null);

	const context = useContext(APICacheContext);

	const [countryCodes, setCountryCodes] = useState([]);

	useEffect(() => {
		(async function anyNameFunction() {
			const response = await context?.load(['https://admitted-exoplanet.glitch.me/api/countries']);
			if (!isEmpty(response)) {
				setCountryCodes(head(response).data);
			}
		})();
	}, [context]);

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
		if (!username) {
			setIsInvalidUsername(true);
		} else {
			setIsInvalidUsername(false);
		}
		if ((!password && !confirmPassword) || password !== confirmPassword) {
			setIsInvalidPassword(true);
		} else {
			setIsInvalidPassword(false);
		}
		if (!isValidEmail(email)) {
			AppToaster.show({ message: 'Enter a valid email address' });
			setIsInvalidEmail(true);
		} else {
			setIsInvalidEmail(false);
		}
	};

	const handlePhoneNumber = (e: any) => {
		const value = e.currentTarget.value;
		setPhone(trimStart(formatPhone(value).slice(0, 9)));
	};

	const handleItemSelect = (item: ICountryProps) => {
		setSelectedCountry(item);
	};

	const text = 'Select a country';

	return (
		<div className="container">
			<div className="justify-content-center">
				<Card elevation={Elevation.TWO}>
					<div className="p-4 position-relative">
						<FormGroup label="Username" labelInfo="(required)">
							<InputGroup
								placeholder="Username"
								intent={isInvalidUsername ? Intent.DANGER : Intent.PRIMARY}
								value={username}
								rightElement={userIcon}
								round
								onChange={(e: any) => setUsername(e.currentTarget.value)}
							/>
						</FormGroup>
						<FormGroup label="Password" labelInfo="(required)">
							<InputGroup
								placeholder="Enter your password..."
								rightElement={lockButton}
								intent={isInvalidPassword ? Intent.DANGER : Intent.PRIMARY}
								type={showPassword ? 'text' : 'password'}
								value={password}
								round
								onChange={(e: any) => setPassword(e.currentTarget.value)}
							/>
						</FormGroup>
						<FormGroup label="Confirm Password" labelInfo="(required)">
							<InputGroup
								placeholder="Confirm your password..."
								rightElement={lockButton}
								intent={isInvalidPassword ? Intent.DANGER : Intent.PRIMARY}
								type={showPassword ? 'text' : 'password'}
								value={confirmPassword}
								round
								onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
							/>
						</FormGroup>
						<FormGroup label="Email" labelInfo="(required)">
							<InputGroup
								placeholder="Email"
								intent={isInvalidEmail ? Intent.DANGER : Intent.PRIMARY}
								value={email}
								rightElement={emailIcon}
								round
								onChange={(e: any) => setEmail(e.currentTarget.value)}
							/>
						</FormGroup>
						<FormGroup label="Phone">
							<ControlGroup fill={true} vertical={false}>
								<CountrySelect
									items={countryCodes || []}
									popoverProps={{ position: PopoverPosition.BOTTOM_LEFT, minimal: true }}
									onItemSelect={handleItemSelect}
									activeItem={selectedCountry}
									onActiveItemChange={setSelectedCountry}
									{...CountrySelectProps}
									noResults={<MenuItem disabled={true} text="No counties found." />}
								>
									<Button
										alignText="left"
										rightIcon="caret-down"
										fill={true}
										text={selectedCountry ? `${selectedCountry.name} (${selectedCountry.dial_code})` : text}
										title={text}
									/>
								</CountrySelect>
								<InputGroup
									placeholder="Phone"
									intent={Intent.PRIMARY}
									value={phone}
									rightElement={phoneIcon}
									round
									onChange={handlePhoneNumber}
								/>
							</ControlGroup>
						</FormGroup>
						<div className="row">
							<div className="col">
								<Button onClick={() => props.handleCancelSignUp(false)}>Cancel</Button>
							</div>
							<div className="col">
								<Button className="float-right" intent={Intent.PRIMARY} onClick={handleSignUp}>
									Register
								</Button>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default SignUp;
