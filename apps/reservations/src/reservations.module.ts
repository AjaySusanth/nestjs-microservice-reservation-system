import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservation.respository';
import { AUTH_SERVICE, DatabaseModule, HealthModule, PAYMENT_SERVICE } from '@app/common';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/reservations/.env'], // for local dev, not required in docker
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT:Joi.number().required(),
        AUTH_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.number().required(),
        PAYMENTS_HOST: Joi.string().required()
      }),
    }),
    ClientsModule.registerAsync([
      {
        name:AUTH_SERVICE,
        imports:[],
        useFactory:(configService:ConfigService) =>({
          transport:Transport.TCP,
          options:{
            host:configService.get<string>("AUTH_HOST"),
            port: configService.get<number>("AUTH_PORT")
          }
        }),
        inject:[ConfigService]
      },
      {
        name:PAYMENT_SERVICE,
        imports:[],
        useFactory:(configService:ConfigService) =>({
          transport:Transport.TCP,
          options:{
            host:configService.get<string>("PAYMENTS_HOST"),
            port: configService.get<number>("PAYMENTS_PORT")
          }
        }),
        inject:[ConfigService]
      }
    ]),
    HealthModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
