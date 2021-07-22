import axios from "axios";
import { API_URL, API_KEY } from "../constants/endpoints";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: API_KEY,
  },
});
