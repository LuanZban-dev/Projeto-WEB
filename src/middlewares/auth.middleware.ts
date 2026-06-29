import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
}

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token não informado."
        });
    }

    const [, token] = authHeader.split(" ");

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as TokenPayload;

        request.user = {
            id: decoded.id
        };

        next();

    } catch {

        return response.status(401).json({
            message: "Token inválido."
        });

    }

}