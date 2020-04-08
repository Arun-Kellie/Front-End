import React, { FunctionComponent, useState } from "react";

import {
  FormGroup,
  InputGroup,
  Intent,
  Tooltip,
  Button,
  Card,
  Elevation, Callout
} from '@blueprintjs/core';

import { Flex, Box } from "reflexbox";
import { Redirect } from "react-router-dom";
import AppToaster from '../utils/AppToaster';
import {userDetails} from '../utils/loginDetails';
import {userIcon} from '../utils/IconsComponent';

const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setSignUp] = useState<boolean>(false);
  const [isForgotPassword, setForgotPassword] = useState<boolean>(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
  const [isInvalidLoginInfo, setIsInvalidLoginInfo] = useState<boolean>(false);

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

  const handleSignUp = () => {
      setSignUp(true);
  };

  const handleLogin = () => {
    if(!username) {
      setIsInvalidUsername(true)
    } else {
      setIsInvalidUsername(false)
    }
    if(!password) {
      setIsInvalidPassword(true)
    } else {
      setIsInvalidPassword(false)
    }
    if (username === userDetails.name && password === userDetails.password) {
      AppToaster.show({message: 'User logged in.'})
      setIsInvalidLoginInfo(false)
    } else {
      setIsInvalidLoginInfo(true)
    }
  };

  if (isSignUp) {
    return <Redirect push to="/signup" />;
  }
  if (isForgotPassword) {
    return <Redirect push to="/forgot" />;
  }
  return (
    <div className="container">
      <div className="justify-content-center row">
        <div className="col-lg-5">
          <Card interactive={true} elevation={Elevation.TWO}>
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  round
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button intent={Intent.PRIMARY} onClick={handleLogin}>Login</Button>
              </FormGroup>
              <Flex flexWrap="wrap">
                <Box width={[1, 1 / 2]} p={2}>
                  <Button intent={Intent.PRIMARY} onClick={handleSignUp}>
                    Sign up
                  </Button>
                </Box>
                <Box width={[1, 1/2]} p={2}>
                  <Button minimal onClick={() => setForgotPassword(true)}>Forgot your password?</Button>
                </Box>
              </Flex>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
