import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthorisedRequest extends Request {
  userId : number; 
}

const authMiddleware = (req: AuthorisedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id:number};
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid', error });
  }
};

export default authMiddleware;
