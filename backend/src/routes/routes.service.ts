import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { kdTree } from 'kd-tree-javascript'
import { Node } from 'src/nodes/entities/node.entity'
import { NodesService } from 'src/nodes/nodes.service'
import { NodesRepository } from 'src/nodes/repository/nodes.repository'
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { Route } from './entities/route.entity'
import { RoutesRatingRepository } from './repository/routes-rating.repository'
import { RoutesRepository } from './repository/routes.repository'
import fetch from 'node-fetch'
import { AirPollutionRes } from './interfaces/air-pollution-res.interface'

@Injectable()
export class RoutesService {
    private readonly airPollutionData: Record<string, any> = {}

    constructor(
        @InjectRepository(RoutesRatingRepository)
        private readonly routesRatingRepository: RoutesRatingRepository,
        private readonly nodesRepository: NodesRepository,
        private readonly routesRepository: RoutesRepository,
        private readonly nodesService: NodesService
    ) {}

    async getRoute(getRouteDto: GetRouteDto) {
        const nodes: Node[] = await this.nodesService.getAllNodes()
        const startPointNode: Node = new Node(getRouteDto.startNodeLat, getRouteDto.startNodeLong)
        const nearestStartNode = this.findNearestNode(nodes, startPointNode)
        const endPointNode = new Node(getRouteDto.endNodeLat, getRouteDto.endNodeLong)
        const nearestEndNode = this.findNearestNode(nodes, endPointNode)
        const segments = await this.nodesRepository.findShortestRouteBetweenTwoNodes(
            nearestStartNode.nodeId,
            nearestEndNode.nodeId
        )
        for await (const segment of segments) {
            const rating = await this.routesRatingRepository.getAvgRatingForRoute(
                segment.start.nodeId,
                segment.end.nodeId
            )
            segment.rating = rating || 4
        }
        // console.log(segments)
        return segments
    }

    private findNearestNode(nodes: Node[], node: Node): Node {
        const nodesTree = new kdTree(nodes, this.findNodesDelta, ['long', 'lat'])
        const [nearestNode, _delta] = nodesTree.nearest(node, 1)[0]
        return nearestNode
    }

    private findNodesDelta(a: Node, b: Node): number {
        const c = (a.lat - b.lat) ** 2 + (a.long - b.long) ** 2
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

    async getPollutionData(airPollutionReqDto: AirPollutionReqDto) {
        const startPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.startLat};${airPollutionReqDto.startLon}/?token=${process.env.AIR_QUALITY_KEY}`
        const endPointUrl = `https://api.waqi.info/feed/geo:${airPollutionReqDto.endLat};${airPollutionReqDto.endLon}/?token=${process.env.AIR_QUALITY_KEY}`

        if (!(startPointUrl in airPollutionReqDto)) {
            const startPointRes = await fetch(startPointUrl)
            const startPointData = await startPointRes.json()
            this.airPollutionData[startPointUrl] = startPointData
        }
        if (!(endPointUrl in airPollutionReqDto)) {
            const endPointRes = await fetch(endPointUrl)
            const endPointData = await endPointRes.json()
            this.airPollutionData[endPointUrl] = endPointData
        }

        return { startPointData: this.airPollutionData[startPointUrl], endPointData: this.airPollutionData[endPointUrl] }
    }

    async airPollution(airPollutionReqDtos: AirPollutionReqDto[]): Promise<AirPollutionRes[]> {
        const requests = airPollutionReqDtos.map(dto => this.getPollutionData(dto))
        const responses = await Promise.all(requests)

        console.log(responses);
        
        let date: Date
        let pollution: number

        let data: AirPollutionRes[] = []
        responses.map(res => {
            if (
                new Date(res.startPointData.data.time.s).getTime() >
                new Date(res.endPointData.data.time.s).getTime()
            ) {
                date = res.startPointData.data.time.s
            } else {
                date = res.endPointData.data.time.s
            }

            pollution = (res.startPointData.data.iaqi.pm10.v + res.endPointData.data.iaqi.pm10.v) / 2

            data.push({
                measurementTime: date,
                pollutionIndex: pollution
            })
        })

        return data
    }
}
