import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.respository';
import { PAYMENT_SERVICE } from '@app/common';
import {ClientProxy} from '@nestjs/microservices'
import { map } from 'rxjs';
@Injectable()
export class ReservationsService {
  constructor(
    protected readonly reservationRepository:ReservationRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService:ClientProxy
  ) {}
  async create(createReservationDto: CreateReservationDto,userId:string) {
    return this.paymentsService.send('create_charge',createReservationDto.charge)
    .pipe(
      map((res) => {
      console.log(res)
      return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
      invoiceId:res.id
    })
    }
    )
  )
    
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({_id});
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      {_id},
      {$set: updateReservationDto} //$set ensures you only update specific fields in MongoDB, not the whole document.
    );
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({_id});
  }
}
