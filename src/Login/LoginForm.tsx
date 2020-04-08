import React, { FunctionComponent, useState } from "react";

import {
  FormGroup,
  InputGroup,
  Intent,
  Tooltip,
  Button,
  Card,
  Elevation
} from "@blueprintjs/core";

import { Flex, Box } from "reflexbox";
import { Redirect } from "react-router-dom";
import AppToaster from '../utils/AppToaster';

const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setSignUp] = useState<boolean>(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);

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
    <Tooltip content={"Enter a username or email address"}>
      <Button icon={"user"} intent={Intent.WARNING} minimal={true} />
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
    if (username && password) {
      AppToaster.show({message: 'User logged in.'})
    }
  };

  if (isSignUp) {
    return <Redirect push to="/signup" />;
  }
  return (
    <div className="container">
      <div className="justify-content-center row">
        <div className="col-lg-5">
          <Card interactive={true} elevation={Elevation.TWO}>
            <div className="p-4 position-relative">
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
                <Box width={[1, 1 / 2]} p={3}>
                  <Button intent={Intent.PRIMARY} onClick={handleSignUp}>
                    Sign up
                  </Button>
                </Box>
                <Box width={[1, 1 / 2]} p={2}>
                  <Button minimal>Forgot your password?</Button>
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
