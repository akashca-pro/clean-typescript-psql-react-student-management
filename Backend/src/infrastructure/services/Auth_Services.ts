import bcrypt from 'bcryptjs';
import Jwt,{JwtPayload} from 'jsonwebtoken';
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

    verify_token(token: string): JwtPayload | null {
        try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return typeof decoded === "object" ? decoded : null;
        } catch (error) {
            return null
        }
    }

}