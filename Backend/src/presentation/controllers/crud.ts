import {  Response } from "express";
import { CustomRequest } from "@/utils/Interfaces";
import { Student_Usecase } from "@/application/usecases/Student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const use_case = new Student_Usecase(new Student_Repository(), new AuthService());

export const loadProfile = async (req : CustomRequest , res : Response) : Promise<void> => {

    try {
        
        const id = req.user?.id; 

        if (!id) {
            res.status(401).json({ message: "Unauthorized: No user ID found" });
            return;
        }

        const user = await use_case.getById(id);

        if(!user){
            res.status(404).json({ message: " User not found" });
            return;
        }

        const response  = {
            id : user?.id,
            email : user?.email,
            name : user?.name
        }

        res.status(200).json({ data : response });

    } catch (error) {
        console.log('loadProfile',error);
        res.status(500).json({ message : 'Internal server error' });
    }
    
}

export const updateProfile = async (req:CustomRequest, res : Response) : Promise<void> => {
    
    try {
        const id = req.user?.id;
        const { name, email } = req.body;

        if (!id) {
            res.status(401).json({ message: "Unauthorized: No user ID found" });
            return;
        }

        const user = await use_case.getById(id);
 
        if(!user){
            res.status(404).json({ message: " User not found" });
            return;
        }

        const alreadyExist = await use_case.findByEmail(email);

        if(alreadyExist?.email === email){
            res.status(407).json({ message : 'Email already exist' });
            return;
        }

        const updated_data = await use_case.update(id,{ name,email });

        res.status(200).json({ message : 'Profile details updated' , data : updated_data })

    } catch (error) {
        console.log('updateProfile',error);
        res.status(500).json({ message : 'Internal server error' });
    }

}

export const deleteProfile = async (req : CustomRequest, res : Response) : Promise<void> => {
    
    try {
        
        const id = req.user?.id;

        if (!id) {
            res.status(401).json({ message: "Unauthorized: No user ID found" });
            return;
        }

        const user = await use_case.getById(id);
 
        if(!user){
            res.status(404).json({ message: " User not found" });
            return;
        }

        await use_case.delete(id);

        res.status(200).json({ message : 'Profile deleted successfully' })

    } catch (error) {
        console.log('deleteProfile',error);
        res.status(500).json({ message : 'Internal server error' });
    }

}