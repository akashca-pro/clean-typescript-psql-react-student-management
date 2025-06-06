import { IAuth_Service } from '@/domain/services/IAuth_Services'
import { TokenValue } from '@/utils/Interfaces';

export class Token_Usecase {
    constructor(
        private readonly auth_service : IAuth_Service
    ){}

    generate_token(payload : object) : string{
        return this.auth_service.generate_token(payload);
    }

    verify_token(token : string) : TokenValue | null{
        return this.auth_service.verify_token(token);
    }

}