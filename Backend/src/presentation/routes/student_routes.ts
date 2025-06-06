import { Router } from "express";
import { login, signup } from "../controllers/Auth";
import { validateSignup, validateLogin } from '@/presentation/middlewares/validation' 

const router = Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

export default router