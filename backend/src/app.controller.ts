import { Controller, Get } from '@nestjs/common'
import { kdTree } from 'kd-tree-javascript'
import { Neo4jService } from 'nest-neo4j/dist'
import { AppService } from './app.service'
import { Node } from './nodes/entities/node.entity'
// import { kdTree} from 'kd-tree-javascript'

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
        // const res = await this.neo4jService.read(`MATCH (n) RETURN n limit 10`)
        // const queryResult = await this.neo4jService.read(`
        // MATCH (node:Node) return node limit 10`)
        // const nodes = queryResult.records.map(node =>  new Node(node.get('node')))
        // const calcDistance = (a, b) => (a.lat - b.lat) ** 2 + (a.long - b.long) ** 2
        // const nodesTree = new kdTree(nodes, calcDistance, ['long', 'lat'])
        // const point = new Node();
        // point.lat = 7.422909;
        // point.long = 43.737117
        // const nearestNode = nodesTree.nearest(point, 1);
        // return res
    }
}
