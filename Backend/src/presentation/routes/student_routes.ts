import { Router } from "express";
import { login, signup } from "../controllers/Auth";
import { validateSignup, validateLogin } from '@/presentation/middlewares/validation' 
import { verify_token } from "../middlewares/verifyToken";
import { deleteProfile, loadProfile, updateProfile } from "../controllers/crud";



const router = Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

router.get('/profile', verify_token, loadProfile)

router.patch('/profile/update-profile', verify_token, updateProfile)

router.delete('/profile/delete-profile', verify_token, deleteProfile)

export default router