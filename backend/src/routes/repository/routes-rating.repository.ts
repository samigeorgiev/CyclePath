import { Neo4jService, Result } from 'nest-neo4j/dist'
import { QueryResult } from 'neo4j-driver'
import { EntityRepository, Repository } from 'typeorm'
import { RouteRating } from '../entities/route-rating.entity'
import { Route } from '../entities/route.entity'
import { NotFoundException } from '@nestjs/common'
import { RateRouteDto } from '../dto/rate-route.dto'

@EntityRepository(RouteRating)
export class RoutesRatingRepository extends Repository<RouteRating> {
    async createRouteRating(rateRouteDto: RateRouteDto, userId: number): Promise<RouteRating> {
        const routeRating: RouteRating = this.create({ ...rateRouteDto, userId })

        return this.save(routeRating)
    }

    async getAvgRatingForRoute(nodeOneId: number, nodeTwoId: number): Promise<number> {
        const avgRating: number = await this.createQueryBuilder('routeRatings')
            .select('AVG(routeRatings.rating)')
            .where('routeRating.nodeOneId = :nodeOneId', { nodeOneId })
            .andWhere('routeRating.nodeTwoId = :nodeTwoId', { nodeTwoId })
            .getRawOne()

        return avgRating
    }
}
