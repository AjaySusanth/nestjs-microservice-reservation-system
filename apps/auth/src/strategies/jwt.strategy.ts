import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService:ConfigService,
        private readonly userService:UsersService) {
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (request:Request) => request?.cookies?.Authentication
            ]),
            secretOrKey:configService.get<string>('JWT_SECRET')!
        })
    }

    async validate({userId}: TokenPayload) {
        return this.userService.getUser({_id:userId})
    }

}