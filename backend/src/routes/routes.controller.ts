import { Get } from '@nestjs/common'
import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common'
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    // get(
    //     @Param('startNodeId') startNodeLat: number,
    //     @Param('endNodeId') startNodeLong: number, 
    //     @Param('startNodeId') startNodeLat: number,
    //     @Param('endNodeId') startNodeLong: number, ) { 
    //     }

    @Post('rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto) {
        //TO DO: get userId from request object after implementing auth
        const userId: number = 1

        await this.routesService.rateRoute(rateRouteDto, userId)
    }

    @Get('air-pollution')
    async airPollution (@Body(ValidationPipe) airPollutionReqDto: AirPollutionReqDto) {

        return await this.routesService.airPollution(airPollutionReqDto)
    }
}
