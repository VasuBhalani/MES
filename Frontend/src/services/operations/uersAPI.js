import {adminEndpoints} from '../../features/admin/adminEndpoints.js';
import { setLoading } from '../../features/auth/authSlice.js';
import toast from 'react-hot-toast';
import { apiConnector } from "../apiConnector.js";

const {CREATE_USER} = adminEndpoints;

export const create_user=(data)=>{
    return async(dispatch)=>{
         dispatch(setLoading(true));
         try{
            const response = await apiConnector("POST",CREATE_USER,data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successful!");
            navigate("/admin");

         }catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }
}