import { Injectable, NotFoundException } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { QueryResult, integer, int } from 'neo4j-driver'
import { Node } from '../entities/node.entity'

@Injectable()
export class NodesRepository {
    constructor(private readonly neo4jService: Neo4jService) {}

    async getAllNodes(): Promise<Node[]> {
        const queryResult: QueryResult = await this.neo4jService.read(`
            MATCH (node:Node)
            return node`)
        return queryResult.records.map(node => {
            const graphNode = node.get('node')
            const nodeEntity = new Node(
                graphNode.properties['lat'],
                graphNode.properties['long'],
                graphNode.properties['node_id']
            )
            return nodeEntity
        })
    }

    async findShortestRouteBetweenTwoNodes(
        startNodeId: number | string,
        endNodeId: number | string
    ) {
        await this.rebuildGdsGraph()
        const queryResult = await this.neo4jService.read(
            `
            MATCH
                (startNode:Node {node_id: $startNodeId}),
                (endNode:Node {node_id: $endNodeId})
            CALL gds.beta.shortestPath.dijkstra.stream('nodesGraph', {
                sourceNode: id(startNode),
                targetNode: id(endNode),
                path: true,
                relationshipWeightProperty: 'cost'
            })
            YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
            RETURN
                path`,
            { startNodeId, endNodeId }
        )
        console.log(startNodeId, endNodeId)
        console.log(queryResult.records)
        if (queryResult.records.length === 0) {
            return []
        }
        let total_cost = 0.0
        const routeSegments = queryResult.records[0].get('path').segments.map(segment => {
            const start = new Node(
                segment.start.properties['lat'],
                segment.start.properties['long'],
                segment.start.properties['node_id']
            )
            const end = new Node(
                segment.end.properties['lat'],
                segment.end.properties['long'],
                segment.end.properties['node_id']
            )
            const routeSegment = {
                start,
                end,
                cost: segment.relationship.properties['cost'],
                rating: 4
            }
            total_cost += routeSegment.cost
            return routeSegment
        })
        console.log('total cost: ' + total_cost)
        return routeSegments
    }

    private async rebuildGdsGraph(): Promise<void> {
        await this.neo4jService.write(`CALL gds.graph.drop('nodesGraph')`)
        await this.neo4jService.write(`
        CALL gds.graph.create(
            'nodesGraph',
            'Node',
            'Route',
            {
                relationshipProperties: ['rating', 'cost']
            }
        )`)
    }
}
