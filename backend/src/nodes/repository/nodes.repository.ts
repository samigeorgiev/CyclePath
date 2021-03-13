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

    async getAllNodes(): Promise<Node[]> {
        const queryResult = await this.neo4jService.read(`
            MATCH (node:Node)
            return node`)
        return queryResult.records.map(node => new Node(node.get('node')))
    }

    async findShortestRouteBetweenTwoNodes(startNodeId: number, endNodeId: number) {
        const queryResult = await this.neo4jService.read(
            `
            MATCH
                (startNode: Node{node_id: $startNodeId}),
                (endNode: Node{node_id: $endNodeId}),
                path = shortestPath((n1)-[:Route*]-(n2))
            return path`,
            { startNodeId, endNodeId }
        )
        /*match
                        (n1: Node{node_id: 258071984}),
                        (n2: Node{node_id: 21915639}),
                        path = shortestPath((n1)-[:Route*]-(n2))
                        with REDUCE(dist = 0, rel in relationships(path) | dist + toInteger(rel.distance)) AS distance, path
                    return path, distance */
        console.log(queryResult.records)
        return
    }
}
