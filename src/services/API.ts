import axios, { Method as AxiosMethods } from "axios";
import { HTTPError } from "../support/errors";

const API_BASE = process.env.REACT_APP_API_HOST;

async function request(
  path: string,
  requestMethod: AxiosMethods,
  options?: RequestInit
) {
  // const url = `${API_BASE}${path}`;

  const url = path;
  try {
    const response = await axios.request({
      url,
      method: requestMethod
    });

    if (response.status === 200) {
      return response;
    }
    throw response;
  } catch (error) {
    throw new HTTPError(url, error.response.status, error.response.statusText);
  }
}

export const load = async (path: string) => {
  return await request(path, "GET");
};

export const create = async (path: string, payload: object) => {
  return await request(path, "POST", payload);
};

export const update = create;

export const remove = async (path: string) => {
  await request(path, "DELETE");
};
