import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { Route } from './entities/route.entity'
import { RoutesRatingRepository } from './repository/routes-rating.repository'
import { RoutesRepository } from './repository/routes.repository'
import fetch from 'node-fetch'
import { AirPollutionRes } from './interfaces/air-pollution-res.interface'

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

    async getPollutionData(airPollutionReqDto: AirPollutionReqDto) {
        const startPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.startLat};${airPollutionReqDto.startLon}/?token=${process.env.AIR_QUALITY_KEY}`;
        const endPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.endLat};${airPollutionReqDto.endLon}/?token=${process.env.AIR_QUALITY_KEY}`;

        const startPointRes = await fetch (startPointUrl)
        const startPointData = await startPointRes.json()

        const endPointRes = await fetch (endPointUrl)
        const endPointData = await endPointRes.json()

        return { startPointData: startPointData, endPointData: endPointData }
    }

    async airPollution (airPollutionReqDto: AirPollutionReqDto) : Promise<AirPollutionRes> {
        const data = await this.getPollutionData(airPollutionReqDto)
        
        let date;
        if (new Date(data.startPointData.data.time.s).getTime() > new Date(data.endPointData.data.time.s).getTime()) {
            date = data.startPointData.data.time.s;
        } else {
            date = data.endPointData.data.time.s;
        }

        const pollution = (data.startPointData.data.iaqi.pm10.v + data.endPointData.data.iaqi.pm10.v) / 2

        
        return {
            measurementTime: date,
            pollutionIndex: pollution
        }

    }
}
