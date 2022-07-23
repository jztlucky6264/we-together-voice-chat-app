import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);

export default api;
