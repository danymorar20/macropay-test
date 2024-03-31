import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../types";

declare module 'express' {
    interface Request {
        user?: User;
    }
}

export const cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.MY_SECRET as string) as JwtPayload;
        req.user = user as User;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(403).send();
    }
};
