import { Response } from "express";
import { CustomRequest } from "@/utils/Interfaces";
import { Student_Usecase } from "@/application/usecases/Student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";
import { validationResult } from 'express-validator';
import { Token_Usecase } from "@/application/usecases/Token_usecase";

const student_use_case = new Student_Usecase(new Student_Repository(), new AuthService());
const token_use_case = new Token_Usecase(new AuthService());

export const signup = async (req : CustomRequest,res : Response) : Promise<void> => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json({ errors : errors.array() })
            return;
        }

        const { name, email, password } = req.body;

        const alreadyExist = await student_use_case.findByEmail(email);

        if(alreadyExist){
            res.status(407).json({message : 'Account already exist'})
            return
        }

        const student_details = await student_use_case.create({
            name,email,password
        });

        const token = token_use_case.generate_token({ 
            id : student_details.id, email : student_details.email })

        res.cookie('token',token,{
            httpOnly : true,
            sameSite : 'strict',
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        })

        res.status(201).json({ message : 'Account created successfully' });

    } catch (error) {
        console.log('Signup error',error)
        res.status(500).json('Internal server error');
    }

}

export const login = async (req : CustomRequest, res : Response) : Promise<void> =>{
    
    try {
        
        const { email, password } = req.body;
        
        const user = await student_use_case.findByEmail(email);

        if(!user){
            res.status(404).json({ message : 'Uh oh , Account not found ' })
            return;
        }

        if(!await student_use_case.compare_password(password, user.password)){
            res.status(400).json({ message : 'Incorrect Password' });
            return;
        }

        const token = token_use_case.generate_token({ id : user.id, email : user.email })

        res.cookie('token',token,{
            httpOnly : true,
            sameSite : 'strict',
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        })
        
        res.status(200).json({ message : 'Login Successfull' });

    } catch (error) {
        console.log('Login error',error);
        res.status(500).json('Internal server error');
    }

}

export const logout = async (req : CustomRequest, res : Response) => {
    
    try {

    res.cookie('token', "", { 
        httpOnly: true,  
        sameSite: 'strict', 
        expires: new Date(0) 
    });

    res.status(200).json({ message : 'Logout success' });
        
    } catch (error) {
        console.log('Logout error',error);
        res.status(500).json('Internal server error');
    }

}
