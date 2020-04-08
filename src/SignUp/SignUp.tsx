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
import { trimStart } from "lodash";
import { formatPhoneNumber, isValidEmail } from "../utils/util";

const SignUp: FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setSignUp] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
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
    <Tooltip content={"Enter a username"}>
      <Button icon={"user"} intent={Intent.WARNING} minimal={true} />
    </Tooltip>
  );

  const emailIcon = (
    <Tooltip content={"Enter an email address"}>
      <Button icon={"envelope"} intent={Intent.WARNING} minimal={true} />
    </Tooltip>
  );

  const phoneIcon = (
    <Tooltip content={"Enter a valid phone number"}>
      <Button icon={"phone"} intent={Intent.WARNING} minimal={true} />
    </Tooltip>
  );

  const handleSignUp = () => {
    if(!username) {
      setIsInvalidUsername(true)
    } else {
      setIsInvalidUsername(false)
    }
    if((!password && !confirmPassword) || (password !== confirmPassword)) {
      setIsInvalidPassword(true);
    } else {
      setIsInvalidPassword(false);
    }
    if(!isValidEmail(email)) {
      setIsInvalidEmail(true)
    } else {
      setIsInvalidEmail(false)
    }
  };

  const handlePhoneNumber = (e: any) => {
    const value = e.currentTarget.value;
    setPhone(trimStart(formatPhoneNumber(value).slice(0, 11)));
  };

  if (isSignUp) {
  }
  return (
    <div className="container">
      <div className="justify-content-center row">
        <div className="col-lg-5">
          <Card interactive={true} elevation={Elevation.TWO}>
            <div className="p-4 position-relative">
              <FormGroup label="Username">
                <InputGroup
                  placeholder="Username"
                  intent={isInvalidUsername ? Intent.DANGER : Intent.PRIMARY}
                  value={username}
                  rightElement={userIcon}
                  round
                  onChange={(e: any) => setUsername(e.currentTarget.value)}
                />
              </FormGroup>
              <FormGroup label="Password">
                <InputGroup
                  placeholder="Enter your password..."
                  rightElement={lockButton}
                  intent={isInvalidPassword ? Intent.DANGER : Intent.PRIMARY}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  round
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                />
              </FormGroup>
              <FormGroup label="Confirm Password">
                <InputGroup
                  placeholder="Confirm your password..."
                  rightElement={lockButton}
                  intent={isInvalidPassword ? Intent.DANGER : Intent.PRIMARY}
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  round
                  onChange={(e: any) =>
                    setConfirmPassword(e.currentTarget.value)
                  }
                />
              </FormGroup>
              <FormGroup label="Email">
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
                <InputGroup
                  placeholder="Phone"
                  intent={Intent.PRIMARY}
                  value={phone}
                  rightElement={phoneIcon}
                  round
                  onChange={handlePhoneNumber}
                />
              </FormGroup>
              <Flex flexWrap="wrap">
                <Box width={[1, 1 / 2]} p={3}>
                  <Button onClick={() => setSignUp(true)}>Cancel</Button>
                </Box>
                <Box width={[1, 1 / 2]} p={3}>
                  <Button intent={Intent.PRIMARY} onClick={handleSignUp}>
                    Register
                  </Button>
                </Box>
              </Flex>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
