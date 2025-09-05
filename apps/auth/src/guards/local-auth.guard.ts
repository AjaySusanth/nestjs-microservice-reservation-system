import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {}
// passport-local Auth guard : Used for authenticating users with a username/email and password.