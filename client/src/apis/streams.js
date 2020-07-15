import axios from "axios";

const streamApi = axios.create({
  baseURL: "http://localhost:3001",
});

export default streamApi;
