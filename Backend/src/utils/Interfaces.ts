import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: JwtPayload & { id: number } | null;
}

export interface TokenValue extends JwtPayload {
    id : number;
    email : string;
}