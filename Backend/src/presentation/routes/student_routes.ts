import { Router } from "express";
import { Student_Usecase } from "@/application/usecases/student_usecase";
import { Student_Repository } from "@/infrastructure/repositories/Student_Repository";
import { AuthService } from "@/infrastructure/services/Auth_Services";

const router = Router();

const useCase = new Student_Usecase(new Student_Repository(), new AuthService());

router.get('/home',async (req,res) => {
    try {
        const student = await useCase.getAll();
        res.status(201).send(JSON.stringify(student));
    } catch (error) {
        res.status(500).json('Internal server error');
    }
    }
)

router.post('/signup', async (req,res) => {
    try {
        const student = await useCase.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json('Internal server error');
    }

})

export default router