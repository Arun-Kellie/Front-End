import { replace, toLower } from "lodash";

export const formatPhoneNumber = (number: string) => {
  if (number) {
    return replace(
      replace(number.toString(), /\D+/g, ""),
      /(\d{2})(\d{6})/,
      "($1) $2"
    );
  }
  return "";
};

export const isValidEmail = (email: string) => {
  if (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      toLower(String(email))
    );
  }
  return false;
};