import { replace, toLower } from "lodash";

export const chartColors: Array<string> = [
  "#7cb5ec",
  "#434348",
  "#90ed7d",
  "#f7a35c",
  "#8085e9",
  "#f15c80",
  "#e4d354",
  "#2b908f",
  "#f45b5b",
  "#91e8e1"
];

export const formatPhoneNumber = (number: string) => {
  if (number) {
    return replace(
      replace(number.toString(), /\D+/g, ""),
      /(\d{2})(\d{6})/,
      "$1 $2"
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

type ChartOptions = {responsive: boolean, plugins: {datalabels: {color: string}}}

export const chartOptions:ChartOptions = {
  responsive: true,
  plugins: {
    datalabels: {
      color: 'white'
    }
  }
}
