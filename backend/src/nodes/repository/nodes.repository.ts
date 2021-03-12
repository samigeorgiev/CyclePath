import { Injectable, NotFoundException } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { QueryResult } from 'neo4j-driver'
import { Node } from '../entities/node.entity'

@Injectable()
export class NodesRepository {
    constructor(private readonly neo4jService: Neo4jService) {}

    async getNodeByNodeId(nodeId) {
        const queryResult = await this.neo4jService.read(
            `MATCH (n: Node {node_id: $nodeId}) RETURN n`,
            {
                nodeId
            }
        )

        if (!queryResult.records.length) {
            throw new NotFoundException()
        }

        return new Node(queryResult.records[0].get('n'))
    }

    async  findShortestRouteBetweenTwoNodes(startNodeId: number, endNodeId: number) {
        const queryResult = await this.neo4jService.read(
            `MATCH (startNode: Node{node_id: 7271008793}, endNode: Node{node_id: 1684697691})
            CAll algo.shortestPath(startNode, endNode, 'distance')
            YIELD writeMillis,loadMillis,nodeCount, totalCost
            RETURN writeMillis,loadMillis,nodeCount,totalCost`
        )
    }
}
