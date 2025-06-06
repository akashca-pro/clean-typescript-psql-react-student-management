import { Router } from "express";
import { Student_Usecase } from "@/application/usecases/Student_usecase"
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";
import { signup } from "../controllers/Auth";
import { validateSignup } from '@/presentation/middlewares/validation' 

const router = Router();

const useCase = new Student_Usecase(new Student_Repository(), new AuthService());

router.post('/signup', validateSignup, signup)

export default router