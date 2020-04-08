import React, {FunctionComponent, useState} from "react";

import {FormGroup, InputGroup, Intent, Tooltip, Button} from "@blueprintjs/core";

import { Flex, Box } from 'reflexbox'
import {Redirect} from "react-router-dom";

const SignUp: FunctionComponent = () => {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSignUp, setSignUp] = useState<boolean>(false);

    const handleLockClick = () => setShowPassword(!showPassword);

    const lockButton = (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip>
    );

    const userIcon = (
        <Tooltip content={'Enter a username'}>
            <Button
                icon={'user'}
                intent={Intent.WARNING}
                minimal={true}
            />
        </Tooltip>
    )

    const emailIcon = (
        <Tooltip content={'Enter an email address'}>
            <Button
                icon={'envelope'}
                intent={Intent.WARNING}
                minimal={true}
            />
        </Tooltip>
    )

    const handleSignUp = () => {
        if(password && confirmPassword && password === confirmPassword) {
            setSignUp(true);
        }
    }

    if(isSignUp) {
        return <Toast />
    }
    return (
        <Box className='col-6' style={{margin: '0 auto'}}>
            <FormGroup>
                <InputGroup
                    placeholder="Username"
                    intent={Intent.PRIMARY}
                    value={username}
                    rightElement={userIcon}
                    round
                    onChange={(e: any) => setUsername(e.currentTarget.value)}/>
            </FormGroup>
            <FormGroup>
                <InputGroup
                    placeholder="Enter your password..."
                    rightElement={lockButton}
                    intent={Intent.PRIMARY}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    round
                    onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
            </FormGroup>
            <FormGroup>
                <InputGroup
                    placeholder="Confirm your password..."
                    rightElement={lockButton}
                    intent={Intent.PRIMARY}
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    round
                    onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
                />
            </FormGroup>
            <FormGroup>
                <InputGroup
                    placeholder="Email"
                    intent={Intent.PRIMARY}
                    value={email}
                    rightElement={emailIcon}
                    round
                    onChange={(e: any) => setEmail(e.currentTarget.value)}/>
            </FormGroup>
            <Flex flexWrap='wrap'>
                <Box
                    width={[ 1, 1/2 ]}
                    p={3}>
                    <Button onClick={() => setSignUp(true)}>Cancel</Button>
                </Box>
                <Box
                    width={[ 1, 1/2 ]}
                    p={3}>
                    <Button intent={Intent.PRIMARY} onClick={handleSignUp}>Register</Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default SignUp;
