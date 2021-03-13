import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
    ValidationPipe
} from '@nestjs/common'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    get(
        @Query('startNodeLat') startNodeLat: number,
        @Query('startNodeLong') startNodeLong: number,
        @Query('endNodeLat') endNodeLat: number,
        @Query('endNodeLong') endNodeLong: number
    ) {
        const request = new GetRouteDto(startNodeLat, startNodeLong, endNodeLat, endNodeLong)
        console.log(request)
        return this.routesService.getRoute(request);
    }

    @Post('rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto): Promise<void> {
        //TO DO: get userId from request object after implementing auth
        const userId: number = 1

        await this.routesService.rateRoute(rateRouteDto, userId)

        return
    }
}
