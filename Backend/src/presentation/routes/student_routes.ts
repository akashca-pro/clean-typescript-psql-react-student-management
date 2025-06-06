import { Router } from "express";
import { login, signup } from "../controllers/Auth";
import { validateSignup, validateLogin } from '@/presentation/middlewares/validation' 
import { verify_token } from "../middlewares/verifyToken";
import { loadHome } from "../controllers/crud";


const router = Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

router.get('/', verify_token, loadHome)

export default router