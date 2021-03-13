import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { kdTree } from 'kd-tree-javascript'
import { Node } from 'src/nodes/entities/node.entity'
import { NodesService } from 'src/nodes/nodes.service'
import { NodesRepository } from 'src/nodes/repository/nodes.repository'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { Route } from './entities/route.entity'
import { RoutesRatingRepository } from './repository/routes-rating.repository'
import { RoutesRepository } from './repository/routes.repository'

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(RoutesRatingRepository)
        private readonly routesRatingRepository: RoutesRatingRepository,
        private readonly nodesRepository: NodesRepository,
        private readonly routesRepository: RoutesRepository,
        private readonly nodesService: NodesService
    ) {}

    async getRoute(getRouteDto: GetRouteDto) {
        const nodes: Node[] = await this.nodesService.getAllNodes();
        const startPointNode: Node = new Node()
        startPointNode.lat = getRouteDto.startNodeLat
        startPointNode.long = getRouteDto.startNodeLong
        const nearestStartNode = this.findNearestNode(nodes, startPointNode)
        const endPointNode = new Node()
        endPointNode.lat = getRouteDto.endNodeLat
        endPointNode.long = getRouteDto.endNodeLong
        const nearestEndNode = this.findNearestNode(nodes, endPointNode)
        console.log(startPointNode, endPointNode)
        console.log(nearestStartNode, nearestEndNode)
        this.nodesRepository.findShortestRouteBetweenTwoNodes(nearestStartNode.nodeId, nearestEndNode.nodeId)
    }

    private findNearestNode(nodes: Node[], node: Node): Node {
        // console.log(node);
        const nodesTree = new kdTree(nodes, this.findNodesDelta, ['long', 'lat'])
        // console.log(nodesTree.nearest(node, 1))
        const [nearestNode, _delta] = nodesTree.nearest(node, 1)[0]
        return nearestNode;
    }

    private findNodesDelta(a: Node, b: Node): number {
        const c = (a.lat - b.lat) ** 2 + (a.long - b.long) ** 2
        // console.log(c)
        return c
    }

    async rateRoute(rateRouteDto: RateRouteDto, userId: number): Promise<void> {
        const route: Route = await this.routesRepository.getRouteByNodesIds(
            rateRouteDto.nodeOneId,
            rateRouteDto.nodeTwoId
        )

        await this.routesRatingRepository.createRouteRating(rateRouteDto, userId)

        const avgRating: number = await this.routesRatingRepository.getAvgRatingForRoute(
            rateRouteDto.nodeOneId,
            rateRouteDto.nodeTwoId
        )

        await this.routesRepository.updateRouteRating(route.getId(), avgRating)
    }
}
