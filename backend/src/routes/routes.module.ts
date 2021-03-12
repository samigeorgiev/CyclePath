import { Module } from '@nestjs/common'
import { RoutesService } from './routes.service'
import { RoutesController } from './routes.controller'
import { Neo4jService } from 'nest-neo4j/dist'
import { RoutesRepository } from './repository/routes.repository'

@Module({
    controllers: [RoutesController],
    providers: [RoutesService, RoutesRepository]
})
export class RoutesModule {
    constructor(private readonly neo4jService: Neo4jService) {}
}
