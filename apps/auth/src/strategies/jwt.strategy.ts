import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService:ConfigService,
        private readonly userService:UsersService) {
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (request:any) => request?.cookies?.Authentication || request?.Authentication || request?.headers.Authentication
            ]),
            secretOrKey:configService.get<string>('JWT_SECRET')!
        })
    }

    async validate({userId}: TokenPayload) {
        return this.userService.getUser({_id:userId})
    }

}