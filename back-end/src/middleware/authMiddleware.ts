import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthorisedRequest extends Request {
  user?: {id : number}; 
}

const authMiddleware = (req: AuthorisedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as {id:number};
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
