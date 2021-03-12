import { IsNumber, Max, Min } from 'class-validator'

export class RateRouteDto {
    @IsNumber()
    nodeOneId: number

    @IsNumber()
    nodeTwoId: number

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number
}
