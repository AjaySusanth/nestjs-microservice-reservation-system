import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository:UserRepository){}
    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto)
    }
}
