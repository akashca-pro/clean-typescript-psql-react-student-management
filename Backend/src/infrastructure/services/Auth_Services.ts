import bcrypt from 'bcryptjs';
import { TokenValue } from '@/utils/Interfaces';
import Jwt from 'jsonwebtoken';
import { IAuth_Service  } from '@/domain/services/IAuth_Services';

export class AuthService implements IAuth_Service {
    
    async hash_password(password: string): Promise<string> {
        return bcrypt.hash(password,10);
    }

    async compare_password(raw: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(raw,hashed);
    }

    generate_token(payload: object): string {
        return Jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24h' });
    }

    verify_token(token: string): TokenValue | null {
        try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as TokenValue;
        return typeof decoded === "object" ? decoded : null;
        } catch (error) {
            return null
        }
    }

}