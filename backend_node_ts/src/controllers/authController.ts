import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { User } from '../types/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export async function postLogin(req: Request, res: Response) {
    console.log(req.body);
    
    try {
        const { email, password } = req.body;
        const user: User | null = await authService.login(email, password); 
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, user: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }   
}

export async function postRegister(req: Request, res: Response) {
    try {
        const { first_name, last_name, phone, email, password } = req.body;
        const newUser: User = await authService.register(first_name, last_name, phone, email,  password);
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}