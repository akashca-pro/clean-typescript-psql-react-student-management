import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface TokenValue extends JwtPayload {
    id : number;
    email : string;
}

export interface CustomRequest extends Request {
    user?: TokenValue | null;
}

