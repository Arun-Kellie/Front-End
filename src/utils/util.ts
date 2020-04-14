import {
  replace,
  toLower,
  isEmpty,
  map,
  isString,
  isNumber,
  includes,
  keys,
  head,
  uniqueId,
  toString
} from "lodash";

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

type ChartOptions = {
  responsive: boolean;
  plugins: { datalabels: { color: string } };
};

export const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    datalabels: {
      color: "white"
    }
  }
};

export const lightenDarkenColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(String((R * (100 + percent)) / 100));
  G = parseInt(String((G * (100 + percent)) / 100));
  B = parseInt(String((B * (100 + percent)) / 100));

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const DROPDOWN_FORMAT = (array: [], prependSelect: boolean = false) => {
  if (!isEmpty(array) && head(array) !== undefined && head(array) !== null) {
    const mappedArray = map(array, (item: any) => {
      if (isString(item) || isNumber(item)) {
        return {
          label: toString(item),
          value: toString(item),
          id: uniqueId(),
          code: uniqueId("code_")
        };
      }
      if (includes(keys(item), "name")) {
        return {
          label: isString(item.name) ? item.name : item,
          value: isString(item.name) ? item.name : item,
          id: toString(item.id) || uniqueId(),
          code: item.code
        };
      }
      if (includes(keys(item), "label")) {
        return {
          label: isString(item.label) ? item.label : item,
          value: isString(item.label) ? item.label : item,
          id: toString(item.id) || uniqueId(),
          code: item.code
        };
      }
    });
    if (prependSelect) {
      mappedArray.unshift({
        label: "-Select-",
        value: "-Select-",
        id: uniqueId(),
        code: uniqueId("code_")
      });
    }
    return mappedArray;
  }
  return [];
};
