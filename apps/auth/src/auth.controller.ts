import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MessagePattern} from '@nestjs/microservices';
import { CurrentUser } from '@app/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user:UserDocument,
    @Res({passthrough:true}) response:Response
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  } 

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(data:any) {
    //console.log("User returned by validate:",data.user)
    return data.user
  }

}

/*
A Message Pattern is a way to define and identify the type of message or event a microservice should listen to and respond to. It acts as a “route” or “topic” for messages within the microservice system.

It’s similar to how HTTP routes work in REST APIs, but instead of URLs, you use message names or patterns.
When a microservice receives a message, it checks the message pattern and invokes the corresponding handler.
*/