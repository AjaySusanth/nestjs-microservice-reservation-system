import { IsEmail, IsStrongPassword, IsOptional, IsArray, IsNotEmpty, IsString  } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    email:string
    @IsStrongPassword()
    password: string

    @IsOptional()
    @IsArray()
    @IsNotEmpty({ each:true })
    @IsString({ each:true })
    roles?: string[]
}