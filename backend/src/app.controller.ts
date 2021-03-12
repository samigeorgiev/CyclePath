import { Controller, Get } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly neo4jService: Neo4jService
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('/all')
    async getAll() {
        const res = await this.neo4jService.read(
            `MATCH (n1: Node{node_id: $nodeOneId})-[r: Route]-(n2: Node{node_id: $nodeTwoId}) RETURN r LIMIT 1`,
            { nodeOneId: 7271008793, nodeTwoId: 1684697691 }
        )

        return res
    }
}
