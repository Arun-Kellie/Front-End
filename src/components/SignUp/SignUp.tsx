import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";

import {
  FormGroup,
  InputGroup,
  Intent,
  Tooltip,
  Button,
  Card,
  Elevation,
  ControlGroup,
  MenuItem
} from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer, Select } from "@blueprintjs/select";
import { head, isEmpty, trimStart } from "lodash";
import {
  formatPhoneNumber,
  highlightText,
  isValidEmail
} from "../../utils/util";
import { emailIcon, phoneIcon, userIcon } from "../../utils/IconsComponent";
import AppToaster from "../../utils/AppToaster";
import APICacheContext from "../../services/APICacheContext";

interface ICountryCodes {
  name: string;
  dial_code: string;
  code: string;
}

interface SignUpProps {
  handleCancelSignUp: (e: boolean) => void;
}

interface ICountryProps {
  name: string;
  code: string;
  dial_code: string;
}

const CountrySelect = Select.ofType<ICountryProps>();

const SignUp: FunctionComponent<SignUpProps> = (props: SignUpProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountryCodes | null>(
    null
  );

  const context = useContext(APICacheContext);

  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    (async function anyNameFunction() {
      const response = await context?.load([
        "https://admitted-exoplanet.glitch.me/api/countries"
      ]);
      if (!isEmpty(response)) {
        setCountryCodes(head(response).data);
      }
    })();
  }, [context]);

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
      AppToaster.show({ message: "Enter a valid email address" });
      setIsInvalidEmail(true);
    } else {
      setIsInvalidEmail(false);
    }
  };

  const handlePhoneNumber = (e: any) => {
    const value = e.currentTarget.value;
    setPhone(trimStart(formatPhoneNumber(value).slice(0, 9)));
  };

  const renderCountry: ItemRenderer<ICountryCodes> = (
    country,
    { handleClick, modifiers, query }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={country.dial_code}
        key={country.code}
        onClick={handleClick}
        text={highlightText(country.name, query)}
      />
    );
  };

  const handleItemSelect = (item: ICountryCodes) => {
    setSelectedCountry(item);
  };

  const filterCountry: ItemPredicate<ICountryCodes> = (
    query,
    country,
    _index,
    exactMatch
  ) => {
    const normalizedTitle = country.name.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return (
        `${country.name}. ${normalizedTitle} ${country.dial_code}`.indexOf(
          normalizedQuery
        ) >= 0
      );
    }
  };

  let text = "Select a country";

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
                type={showPassword ? "text" : "password"}
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
                type={showPassword ? "text" : "password"}
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
                  itemRenderer={renderCountry}
                  onItemSelect={handleItemSelect}
                  activeItem={selectedCountry}
                  itemPredicate={filterCountry}
                  noResults={<MenuItem disabled={true} text="No results." />}
                >
                  <Button
                    alignText="left"
                    rightIcon="caret-down"
                    fill={true}
                    text={
                      selectedCountry
                        ? `${selectedCountry.name} (${selectedCountry.dial_code})`
                        : text
                    }
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
                <Button onClick={() => props.handleCancelSignUp(false)}>
                  Cancel
                </Button>
              </div>
              <div className="col">
                <Button
                  className="float-right"
                  intent={Intent.PRIMARY}
                  onClick={handleSignUp}
                >
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
