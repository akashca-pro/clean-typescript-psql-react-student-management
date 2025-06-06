import { Request, Response } from "express";
import { Student_Usecase } from "@/application/usecases/Student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";
import { validationResult } from 'express-validator';

const use_case = new Student_Usecase(new Student_Repository, new AuthService);

export const signup = async (req : Request,res : Response) : Promise<void> => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json({ errors : errors.array() })
            return;
        }

        const { name, email, password } = req.body;

        const alreadyExist = await use_case.findByEmail(email);

        if(alreadyExist){
            res.status(407).json({message : 'Account already exist'})
            return
        }

        const student_details = await use_case.create({
            name,email,password
        });

        const token = use_case.generate_token({ 
            id : student_details.id, email : student_details.email })

        res.cookie('token',token,{
            httpOnly : true,
            sameSite : 'strict',
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        })

        res.status(201).json({ message : 'Account created successfully' });

    } catch (error) {
        res.status(500).json('Internal server error');
    }

}