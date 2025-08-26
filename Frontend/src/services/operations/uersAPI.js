import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector.js";
import {
  setUsers,
  addUser,
  setUsersLoading,
  setUsersError,
} from "../../features/admin/usersSlice.js";

// apne endpoints import karo
import { adminEndpoints } from "../../features/admin/adminEndpoints";
const { CREATE_USER, GET_USER } = adminEndpoints;

// GET all users (no infinite loop inside)
export const fetch_all_users = () => {
  return async (dispatch) => {
    try {
      dispatch(setUsersLoading(true));
      dispatch(setUsersError(null));

      const res = await apiConnector("GET", GET_USER);
      console.log("Fetched users:", res);
      const list = res?.data?.data || res?.data?.users || [];
      dispatch(setUsers(list));
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to fetch users";
      dispatch(setUsersError(msg));
      toast.error(msg);
    } finally {
      dispatch(setUsersLoading(false));
    }
  };
};

// CREATE user (optimistic add; optionally refetch)
export const create_user = (payload, { refetch = false } = {}) => {
  return async (dispatch) => {
    try {
      dispatch(setUsersLoading(true));
      const res = await apiConnector("POST", CREATE_USER, payload);

      const created =
        res?.data?.data || res?.data?.user || { ...payload, id: Date.now() };

      // optimistic add
      dispatch(addUser(created));
      toast.success("User created successfully!");

      if (refetch) {
        await dispatch(fetch_all_users());
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "User creation failed";
      toast.error(msg);
    } finally {
      dispatch(setUsersLoading(false));
    }
  };
};
