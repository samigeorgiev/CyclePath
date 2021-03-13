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
        const res = await this.neo4jService.read(`MATCH (n) RETURN n limit 10`)
        const queryResult = await this.neo4jService.read(`
        MATCH (node:Node) return node limit 10`)
        // queryResult.records.
        console.log(queryResult.records)
        return res
    }
}
