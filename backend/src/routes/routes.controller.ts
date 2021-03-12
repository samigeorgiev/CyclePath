import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Post('rate')
    rateRoute(@Body(ValidationPipe) rateRouteDto: RateRouteDto) {}
}
