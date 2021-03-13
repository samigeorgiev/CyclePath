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
            start: this.node.properties['start'].low,
            end: this.node.properties['end'].low,
            rating: this.node.properties['rating'].low,
            distance: this.node.properties['distance']
        }
    }
}
