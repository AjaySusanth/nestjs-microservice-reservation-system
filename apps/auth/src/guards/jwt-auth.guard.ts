import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard("jwt") {}
// passport-jwt Auth guard : Used for authenticating users based on jwt