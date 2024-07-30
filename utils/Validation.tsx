const isEmail = (email: string | undefined) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email ? email : '');

const phoneValidation = new RegExp(
  /^\+91\d{10}$/
);
const otpValidation= (otp: string) => new RegExp(
  /^\d{6}$/
).test(otp);
const pincodeValidation = new RegExp(
  /^\d{6}$/
);

export { isEmail, phoneValidation, otpValidation , pincodeValidation};
