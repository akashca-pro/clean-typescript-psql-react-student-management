import {  Response } from "express";
import { CustomRequest } from "@/utils/Interfaces";
import { Student_Usecase } from "@/application/usecases/Student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const use_case = new Student_Usecase(new Student_Repository(), new AuthService());

export const loadHome = async (req : CustomRequest , res : Response) => {

    try {
        
        const id = req.user

    } catch (error) {
        console.log('Home',error);
        res.status(500).json({ message : 'Internal server error' });
    }
    
}