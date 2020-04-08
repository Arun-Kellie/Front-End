import React, {FunctionComponent, useState} from "react";

import {FormGroup, InputGroup, Intent, Tooltip, Button} from "@blueprintjs/core";

import { Flex, Box } from 'reflexbox'
import {Redirect} from "react-router-dom";

const LoginForm: FunctionComponent = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
        <Tooltip content={'Enter a username or email address'}>
            <Button
                icon={'user'}
                intent={Intent.WARNING}
                minimal={true}
            />
        </Tooltip>
    )

    const handleSignUp = () => {
        setSignUp(true);
    }

    if(isSignUp) {
        return <Redirect push to='/signup' />
    }
    return (
        <Box className='col-6' style={{margin: '0 auto'}}>
            <FormGroup>
                <InputGroup
                    placeholder="Username/Email"
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
                <Button intent={Intent.PRIMARY}>Login</Button>
            </FormGroup>
            <Flex flexWrap='wrap'>
                <Box
                    width={[ 1, 1/2 ]}
                    p={3}>
                    <Button intent={Intent.PRIMARY} onClick={handleSignUp}>Sign up</Button>
                </Box>
                <Box
                    width={[ 1, 1/2 ]}
                    p={3}>
                    <Button minimal>Forgot your password?</Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default LoginForm;
