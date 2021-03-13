import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
<<<<<<< HEAD
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
=======
import { GetRouteDto } from './dto/get-route.dto'
>>>>>>> 13e7ec72fa24686ab846ad45e394ce50ee9315fa
import { RateRouteDto } from './dto/rate-route.dto'
import { Route } from './entities/route.entity'
import { RoutesRatingRepository } from './repository/routes-rating.repository'
import { RoutesRepository } from './repository/routes.repository'
import fetch from 'node-fetch'

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

    async airPollution(airPollutionReqDto: AirPollutionReqDto) {
        const startPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.startLat};${airPollutionReqDto.startLon}/?token=${process.env.AIR_QUALITY_KEY}`;
        const endPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.endLat};${airPollutionReqDto.endLon}/?token=${process.env.AIR_QUALITY_KEY}`;

        await fetch (startPointUrl)
            .then(res => res.json())
            .then(console.log)
    }
}
