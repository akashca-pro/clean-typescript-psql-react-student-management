import { axiosInstance } from './axios';
import type { ApiResponse, Student } from './axios'

export const loadProfile = async () : Promise<ApiResponse> => {
    const res = await axiosInstance.get<ApiResponse>('profile');
    return res.data;
}

export const updateProfile = async (student : Partial<Student>) : Promise<ApiResponse> => {
    const res = await axiosInstance.patch<ApiResponse>('profile/update-profile',student);
    return res.data;
}

export const deleteProfile = async () : Promise<ApiResponse> => {
    const res = await axiosInstance.delete<ApiResponse>('profile/delete-profile');
    return res.data;
}