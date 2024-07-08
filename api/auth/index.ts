import axios from "../instance";

export const logIn = (data: { email: string; password: string }) =>
  axios.post("/auth/login", data);

export const signUp = (data: {
  name: string;
  password: string;
  email: string;
}) => axios.post("/auth/signup", data);