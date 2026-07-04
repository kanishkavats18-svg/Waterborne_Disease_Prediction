import axios from "axios";

const API = axios.create({
  baseURL: "https://waterborne-disease-prediction-7ds0.onrender.com/",
});

export default API;