import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Student {
    id? : number;
    name : string;
    email : string;
};

export interface ApiResponse {
    message : string;
    data? : Student
}

export const axiosInstance = axios.create({
    baseURL : API_BASE_URL,
    withCredentials : true,
    headers: {
    "Content-Type": "application/json",
  },
})
