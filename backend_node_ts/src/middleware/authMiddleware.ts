import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);
        //@ts-ignore       
        req.user = decoded; 
        next();

    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}