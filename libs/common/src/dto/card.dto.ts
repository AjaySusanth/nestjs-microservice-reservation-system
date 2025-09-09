import {IsNotEmpty,IsString,IsNumber, IsCreditCard} from 'class-validator'
export class CardDto {
  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNumber()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsCreditCard()
  number?: string;
}
