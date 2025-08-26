import { authEndpoints } from "../../features/auth/authEndpoints.js";
import { apiConnector } from "../apiConnector.js";
import { setAuthLoading, setUser,logout } from "../../features/auth/authSlice.js";
// import { setUser } from "../../fetures/";
import toast from "react-hot-toast";

const { LOGIN, LOGOUT,SEND_OTP, VERIFY_OTP, UPDATE_PASSWORD } = authEndpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN, { email, password });
      
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      
      toast.success("Login successful!");
      navigate("/admin");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
}


export function Logout(navigate) {
  return async (dispatch) => {
    try {
      await apiConnector("POST", LOGOUT);
      dispatch(logout());
      toast.success("Logged Out");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}


// One-off (non-Redux) async actions for password flows
export const sendOtpForPasswordReset = async (data) => {
  try {
    const response = await apiConnector("POST", SEND_OTP, data);
    if (!response.data?.success) throw new Error(response.data?.message || "Failed to send OTP");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send OTP");
    throw error;
  }
};

export const verifyOtpForPasswordReset = async (data) => {
  try {
    const response = await apiConnector("POST", VERIFY_OTP, data);
    if (!response.data?.success) throw new Error(response.data?.message || "Failed to verify OTP");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid OTP");
    throw error;
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await apiConnector("POST", UPDATE_PASSWORD, data);
    if (!response.data?.success) throw new Error(response.data?.message || "Failed to update password");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update password");
    throw error;
  }
};
