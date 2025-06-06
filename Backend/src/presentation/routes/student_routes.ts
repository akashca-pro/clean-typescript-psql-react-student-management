import { Router } from "express";
import { Student_Usecase } from "@/application/usecases/Student_usecase"
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const router = Router();

const useCase = new Student_Usecase(new Student_Repository(), new AuthService());

router.post('/signup',)

export default router