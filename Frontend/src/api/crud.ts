import { axiosInstance } from './axios';
import type { ApiResponse, Student } from './axios'

export const loadProfile = async () : Promise<ApiResponse> => {
    try {
    const res = await axiosInstance.get<ApiResponse>('profile');
    return res.data;
    } catch (error : any) {
    if (error.response) {
      throw error;
    }
    throw new Error('Something went wrong'); 
    }
}

export const updateProfile = async (student : Partial<Student>) : Promise<ApiResponse> => {
    try {
    const res = await axiosInstance.patch<ApiResponse>('profile/update-profile',student);
    return res.data;
    } catch (error : any) {
    if (error.response) {
      throw error;
    }
    throw new Error('Something went wrong');
    }
}

export const deleteProfile = async () : Promise<ApiResponse> => {
    try {
    const res = await axiosInstance.delete<ApiResponse>('profile/delete-profile');
    return res.data;
    } catch (error : any) {
    if (error.response) {
      throw error;
    }
    throw new Error('Something went wrong');
    }
}