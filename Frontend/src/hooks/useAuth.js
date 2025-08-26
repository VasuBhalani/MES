import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuthLoading, logout } from '../features/auth/authSlice';
import { apiConnector } from "../services/apiConnector.js";
import { authEndpoints } from '../features/auth/authEndpoints.js';

const { GET_ME } = authEndpoints;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const fetchedRef = useRef(false); // Ensures API call only once

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setAuthLoading(true));
      try {
        const res = await apiConnector("GET", GET_ME);
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(logout());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    if (!fetchedRef.current && !user) {
      fetchedRef.current = true;
      fetchUser();
    }
  }, [dispatch, user]);

  return { user, isAuthenticated, isLoading: loading };
};
