import { Injectable, NotFoundException } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
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
}
