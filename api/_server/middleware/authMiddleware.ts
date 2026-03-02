import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Read secret inside handler to ensure it's available after dotenv.config()
    const secret = process.env.JWT_SECRET || 'supersecretkeyshouldbeenv';


    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
            console.error("[AUTH] JWT Verification failed:", err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
