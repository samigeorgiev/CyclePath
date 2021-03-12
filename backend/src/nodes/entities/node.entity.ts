import { Node as Neo4JNode } from 'neo4j-driver'
import { INode } from '../interfaces/node.interface'

export class Node {
    constructor(private readonly node: Neo4JNode) {}

    toJSON(): INode {
        return {
            id: this.node.identity.low,
            lat: this.node.properties['lat'],
            long: this.node.properties['long'],
            nodeId: this.node.properties['node_id'].low
        }
    }
}
