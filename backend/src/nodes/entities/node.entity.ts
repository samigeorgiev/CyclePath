import { Node as Neo4JNode } from 'neo4j-driver'
import { INode } from '../interfaces/node.interface'

export class Node {
    public id: number
    public lat: number
    public long: number
    public nodeId: number

    constructor(private readonly node: Neo4JNode) {
        this.id = this.node.identity.low
        this.lat = this.node.properties['lat']
        this.long = this.node.properties['long']
        this.nodeId = this.node.properties['node_id'].low
    }

    toJSON(): INode {
        return {
            id: this.id,
            lat: this.lat,
            long: this.long,
            nodeId: this.nodeId
        }
    }
}
