import { Router } from "express";
import { login, logout, signup } from "../controllers/Auth";
import { validateSignup, validateLogin, validateUpdation } from '@/presentation/middlewares/validation' 
import { verify_token } from "../middlewares/verifyToken";
import { deleteProfile, loadProfile, updateProfile } from "../controllers/crud";

const router = Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

router.delete('/logout', verify_token, logout)

router.get('/profile', verify_token, loadProfile)

router.patch('/profile/update-profile', validateUpdation, 
    verify_token, updateProfile);

router.delete('/profile/delete-profile', verify_token, deleteProfile)

export default router