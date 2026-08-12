import express from 'express'
import protect from '../middleware/auth.js';
import { changePassword, getProfile, login, register, updateProfile } from '../controllers/authController.js';

const router = express.Router();

 router.post('/login',login);
 router.post('/register' ,  register);




 router.get('/profile' , protect , getProfile);
 router.put('/profile' , protect , updateProfile);
 router.post('/change-password' , protect , changePassword);

export default router