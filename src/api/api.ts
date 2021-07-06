import axios from "axios";
import { API_URL } from "../constants/endpoints";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: process.env.REACT_APP_AUTHORIZATION_KEY,
  },
});
