import { Body, Controller, HttpCode, HttpStatus, Param, Post, ValidationPipe } from '@nestjs/common'
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
    async rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto): Promise<void> {
        //TO DO: get userId from request object after implementing auth
        const userId: number = 1

        await this.routesService.rateRoute(rateRouteDto, userId)

        return
    }
}
