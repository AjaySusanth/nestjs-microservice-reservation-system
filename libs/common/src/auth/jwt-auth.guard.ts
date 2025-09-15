import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { catchError, map, Observable, of, tap } from "rxjs";

import { ClientProxy } from "@nestjs/microservices";
import { AUTH_SERVICE } from "../constants";
import { UserDto } from "../dto";
@Injectable()
export class JwtAuthGuard implements CanActivate {
    // CanActivate =>  guard in NestJS for route protection.
    constructor(@Inject(AUTH_SERVICE) private readonly authClient:ClientProxy) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication || context.switchToHttp().getRequest().headers?.authentication
        if(!jwt) {
            return false
        }

        return this.authClient.send<UserDto>('authenticate',{ // authenticate = message pattern in auth.controller,ts
            Authentication:jwt
        }).pipe(
            tap((res)=> {
                context.switchToHttp().getRequest().user = res
            }),
            map(()=>true),
            catchError(()=>of(false))
        )
        /*
        Sends a message to the auth microservice using the message pattern 'authenticate' and passes the JWT in the payload.
        .send() returns an Observable that emits the response from the microservice.
        The comment notes that 'authenticate' matches the handler in the auth controller.
        tap(...): When a response is received from the microservice (the user data if the token is valid),
        attaches the user object to the request (request.user = res).
        map(()=>true): Transforms the Observable’s output:
        Instead of returning the user object, it returns true (meaning the guard allows the request to proceed).
        TypeScript
        */
    }
}