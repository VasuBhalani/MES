const BASE_URL = 'http://localhost:5000/api';

export const authEndpoints = {
  GET_ME:`${BASE_URL}/auth/me`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT:`${BASE_URL}/auth/logout`,
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  UPDATE_PASSWORD: `${BASE_URL}/auth/update-password`,
};
