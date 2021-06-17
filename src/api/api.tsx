import axios from "axios";

const { REACT_APP_ROOT } = process.env;

export const axiosInstance = axios.create({
  baseURL: `${REACT_APP_ROOT}/v1/products`,
});
