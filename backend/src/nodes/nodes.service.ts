import { Injectable } from '@nestjs/common'
import { NodesRepository } from './repository/nodes.repository'

@Injectable()
export class NodesService {
    constructor(private readonly nodesRepository: NodesRepository) {}
}
