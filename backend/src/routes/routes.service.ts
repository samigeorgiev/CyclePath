import { Injectable } from '@nestjs/common'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesRepository } from './repository/routes.repository'

@Injectable()
export class RoutesService {
    constructor(private readonly routesRepository: RoutesRepository) {}

    async rateRoute(rateRouteDto: RateRouteDto) {}
}
