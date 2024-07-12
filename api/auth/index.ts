import axios from "../instance";

export const logIn = (data: { email: string; password: string }) =>
  axios.post("/auth/login", data);

export const signUp = (data: {
  name: string;
  password: string;
  email: string;
}) => axios.post("/auth/signup", data);

export const sendOtp = (data: {
  phone: string
}) => axios.post("/auth/send-otp", data);

export const verifyOtp = (data: {
  phone: string,
  code: string
}) => axios.post("/auth/verify-otp", data);

export const fetchProfile = () => axios.get("/auth/me");