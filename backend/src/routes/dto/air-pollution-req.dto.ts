import { IsNumber } from 'class-validator';

export class AirPollutionReqDto {
  @IsNumber()
  startLat: number

  @IsNumber()
  startLon: number

  @IsNumber()
  endLat: number

  @IsNumber()
  endLon: number
}