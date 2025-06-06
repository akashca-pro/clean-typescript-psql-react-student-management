import { TokenValue } from '@/utils/Interfaces';

export interface IAuth_Service {
    hash_password(password : string) : Promise<string>;
    compare_password(raw : string, hashed : string) : Promise<boolean>
    generate_token(payload : object) : string;
    verify_token(token : string) : TokenValue | null;
}

