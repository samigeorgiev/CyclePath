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
            MATCH (node1:Node)
            return {node_id: toFloat(node1.node_id), lat: node1.lat, long: node1.long} as node`)
        return queryResult.records.map(node => {
            const graphNode = node.get('node')
            const nodeEntity = new Node()
            nodeEntity.nodeId = graphNode.node_id
            nodeEntity.lat = graphNode.lat
            nodeEntity.long = graphNode.long
            return nodeEntity
        })
    }

    async findShortestRouteBetweenTwoNodes(startNodeId: number, endNodeId: number) {
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
        const res = queryResult.records[0].get('path').segments.map(segment => {
            const a = {
                start: {
                    nodeId: this.toNumber(segment.start.properties['node_id']),
                    lat: segment.start.properties['lat'],
                    long: segment.start.properties['long']
                },
                end: {
                    nodeId: this.toNumber(segment.end.properties['node_id']),
                    lat: segment.end.properties['lat'],
                    long: segment.end.properties['long']
                },
                cost: segment.relationship.properties['cost'],
                rating: 4
            }
            console.log(a)
            total_cost += a.cost
            return a
        })
        console.log('total cost: ' + total_cost)
        return res
    }

    private toNumber({ low, high }) {
        let res = high
      
        for (let i = 0; i < 32; i++) {
          res *= 2
        }
      
        return low + res
      }
}
