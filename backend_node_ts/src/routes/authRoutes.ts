//defines application routes and links them to controllers.
import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.postLogin);      
router.post('/register', authController.postRegister); 

export default router;
