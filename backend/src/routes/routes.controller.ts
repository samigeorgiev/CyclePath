import { HttpCode } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common'
import { Get, Param } from '@nestjs/common'
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    get(
        @Param('startNodeId') startNodeLat: number,
        @Param('endNodeId') startNodeLong: number, 
        @Param('startNodeId') endNodeLat: number,
        @Param('endNodeId') endNodeLong: number, ) {
            const request = new GetRouteDto(startNodeLat, startNodeLong, endNodeLat, endNodeLong);
            // this.routesService.getRoute(request);
        }

    @Post('rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto) {
        //TO DO: get userId from request object after implementing auth
        const userId: number = 1

        await this.routesService.rateRoute(rateRouteDto, userId)
    }
}
