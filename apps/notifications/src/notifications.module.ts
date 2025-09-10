import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ['apps/notifications/.env'], // for local dev, not required in docker
      validationSchema: Joi.object({
        PORT:Joi.number().required(),
        GOOGLE_AUTH_CLIENT_ID:Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET:Joi.string().required(),
        GOOGLE_AUTH_REFRESH_TOKEN:Joi.string().required(),
        SMTP_USER:Joi.string().required(),

      })
    }),
    LoggerModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
