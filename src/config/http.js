import axios from "axios";

export const HTTP = axios.create({
  baseURL: "/api/",
  timeout: 1000 * 60,
  headers: {
    Authorization: `Bearer ${localStorage.access_token}`,
  },
});
