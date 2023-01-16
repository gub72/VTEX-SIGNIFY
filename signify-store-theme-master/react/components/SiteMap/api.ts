import axios from "axios";

const api = axios.create({
  baseURL: "/sitemap",
});

export default api;
