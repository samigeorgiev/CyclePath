import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { Route } from './entities/route.entity'
import { RoutesRatingRepository } from './repository/routes-rating.repository'
import { RoutesRepository } from './repository/routes.repository'

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(RoutesRatingRepository)
        private readonly routesRatingRepository: RoutesRatingRepository,
        private readonly routesRepository: RoutesRepository
    ) {}

    async rateRoute(rateRouteDto: RateRouteDto, userId: number): Promise<void> {
        const route: Route = await this.routesRepository.getRouteByNodesIds(
            rateRouteDto.nodeOneId,
            rateRouteDto.nodeTwoId
        )

        await this.routesRatingRepository.createRouteRating(rateRouteDto, userId)

        const avgRating: number = await this.routesRatingRepository.getAvgRatingForRoute(
            rateRouteDto.nodeOneId,
            rateRouteDto.nodeTwoId
        )

        await this.routesRepository.updateRouteRating(route.getId(), avgRating)
    }
}
