import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginWithSpotify = () =>
  (window.location.href = "http://localhost:5000/api/auth.login");

export const searchMusic = async (query, tyoe) => {
  const response = await API.get(`/search?query=${query}&type${type}`);
  return response.data;
};
