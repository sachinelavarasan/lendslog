import axios from "../instance";

import { userSchemaType } from "@/utils/schema";

export const logIn = (data: { phone: string; password: string }) =>
  axios.post("/auth/login", data);

export const signUp = (data: {
  name: string;
  password: string;
  phone: string;
}) => axios.post("/auth/signup", data);

export const sendOtp = (data: {
  phone: string
}) => axios.post("/auth/send-otp", data);

export const verifyOtp = (data: {
  phone: string,
  code: string
}) => axios.post("/auth/verify-otp", data);

export const fetchProfile = () => axios.get("/auth/me");

export const editProfile = (data: userSchemaType ) => axios.put("/auth/edit-profile", data);