import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { GetUserDto } from './dto/get-user.dto';
import { asyncWrapProviders } from 'async_hooks';
@Injectable()
export class UsersService {
    constructor(private readonly userRepository:UserRepository){}
    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUser(createUserDto)
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password,10)
        })
    }

    private async validateCreateUser(createUserDto:CreateUserDto) {
        try {
            await this.userRepository.findOne({email:createUserDto.email})
        } catch (error) {
            return
        }
        throw new UnprocessableEntityException("Email already exists")
    }

    async validateUser(email:string, password: string) {
        const user = await this.userRepository.findOne({email})
        const isPasswordValid = await bcrypt.compare(password,user.password,)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid Credentials")
        }
        return user
    }

    async getUser(getUserDto:GetUserDto) {
        return this.userRepository.findOne(getUserDto)
    }
}
