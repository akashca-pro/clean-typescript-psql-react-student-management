import {  Response } from "express";
import { CustomRequest } from "@/utils/Interfaces";
import { Student_Usecase } from "@/application/usecases/Student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const use_case = new Student_Usecase(new Student_Repository(), new AuthService());

export const loadProfile = async (req : CustomRequest , res : Response) : Promise<void> => {

    try {
        
        const id = req.user?.id 

        if (!id) {
            res.status(401).json({ message: "Unauthorized: No user ID found" });
            return;
        }

        const user = await use_case.getById(id);

        const response  = {
            id : user?.id,
            email : user?.email,
            name : user?.name
        }

        res.status(200).json(response);

    } catch (error) {
        console.log('Home',error);
        res.status(500).json({ message : 'Internal server error' });
    }
    
}

export const update = async (req:CustomRequest, res : Response) => {
    
    try {
        
    } catch (error) {
        
    }

}