import { AuthService } from "@/infrastructure/services/Auth_Services";
import { Token_Usecase } from "@/application/usecases/Token_usecase";
import { Response, NextFunction } from "express";
import { CustomRequest } from "@/utils/Interfaces";

const token_use_case = new Token_Usecase(new AuthService());

export const verify_token = async ( req: CustomRequest, res : Response, next : NextFunction ) => {
    
    try {
        const token = req.cookies['token'];
        if(!token){
            res.status(401).json({ message : 'Unauthorized' });
            return;
        }

        try {
            const decoded = token_use_case.verify_token(token);

            if(!decoded){
            res.status(401).json({ message : 'Unauthorized' });
            return;
            }

            req['user'] = decoded;

            next();

        } catch (error) {
            console.log('verify_token_error',error);
            res.status(401).json({ message : 'Unauthorized' });
        }
        
    } catch (error) {
        console.log('token_verify',error);
        res.status(401).json({ message : 'Internal server error' });
    }

}