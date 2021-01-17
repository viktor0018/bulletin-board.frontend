import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "/api/",
    timeout: 1000 * 60,
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  });
};
