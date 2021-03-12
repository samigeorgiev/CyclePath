import { Node } from 'neo4j-driver'
import { IRoute } from '../interfaces/route.interface'

export class Route {
    constructor(private readonly node: Node) {}

    getId(): number {
        return this.node.identity.low
    }

    toJSON(): IRoute {
        return {
            id: this.node.identity.low,
            start: this.node.properties['start'],
            end: this.node.properties['end'],
            avgRating: this.node.properties['avgRating'],
            distance: this.node.properties['distance']
        }
    }
}
