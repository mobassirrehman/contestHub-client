import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://contesthub-contest-platform.netlify.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
