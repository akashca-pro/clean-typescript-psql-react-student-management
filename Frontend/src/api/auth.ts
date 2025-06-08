import { axiosInstance } from './axios';
import type { ApiResponse } from './axios'

interface AuthDetails {
    name : string;
    email : string;
    password : string;
}

export const signup = async(payload : AuthDetails) : Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse>("signup", payload);
    return res.data;
  } catch (error: any) {
    //   console.log(error);
    if (error.response) {
      throw error;
    }
    throw new Error(error);
  }
}

export const login = async(payload : Omit<AuthDetails,'name'>) : Promise<ApiResponse> => {
    const res = await axiosInstance.post<ApiResponse>('login',payload);
    return res.data;
}

export const logout = async() : Promise<ApiResponse> => {
    const res = await axiosInstance.delete<ApiResponse>('logout');
    return res.data;
}