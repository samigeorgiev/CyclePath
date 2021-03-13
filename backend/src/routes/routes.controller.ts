<<<<<<< HEAD
import { Get } from '@nestjs/common'
import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common'
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
=======
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    ValidationPipe
} from '@nestjs/common'
import { GetRouteDto } from './dto/get-route.dto'
>>>>>>> 13e7ec72fa24686ab846ad45e394ce50ee9315fa
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

<<<<<<< HEAD
    // get(
    //     @Param('startNodeId') startNodeLat: number,
    //     @Param('endNodeId') startNodeLong: number, 
    //     @Param('startNodeId') startNodeLat: number,
    //     @Param('endNodeId') startNodeLong: number, ) { 
    //     }
=======
    @Get()
    get(
        @Param('startNodeId') startNodeLat: number,
        @Param('endNodeId') startNodeLong: number,
        @Param('startNodeId') endNodeLat: number,
        @Param('endNodeId') endNodeLong: number
    ) {
        const request = new GetRouteDto(startNodeLat, startNodeLong, endNodeLat, endNodeLong)
        // this.routesService.getRoute(request);
    }
>>>>>>> 13e7ec72fa24686ab846ad45e394ce50ee9315fa

    @Post('rate')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto): Promise<void> {
        //TO DO: get userId from request object after implementing auth
        const userId: number = 1

        await this.routesService.rateRoute(rateRouteDto, userId)

        return
    }

    @Get('air-pollution')
    async airPollution (@Body(ValidationPipe) airPollutionReqDto: AirPollutionReqDto) {

        return await this.routesService.airPollution(airPollutionReqDto)
    }
}
