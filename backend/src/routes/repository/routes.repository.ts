import { Injectable } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'

@Injectable()
export class RoutesRepository {
    constructor(private readonly neo4jService: Neo4jService) {}
}
