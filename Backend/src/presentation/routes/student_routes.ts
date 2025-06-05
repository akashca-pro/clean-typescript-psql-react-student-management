import { Router } from "express";
import { Student_Usecase } from "@/application/usecases/student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const router = Router();

const useCase = new Student_Usecase(new Student_Repository(), new AuthService());

router.post('/signup', async (req,res) => {
    const student = await useCase.create(req.body);
    res.status(201).json(student);
})

export default router