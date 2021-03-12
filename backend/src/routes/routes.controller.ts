import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RoutesService } from './routes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import { Neo4jService } from 'nest-neo4j/dist'
import { Node } from '../nodes/entities/node.entity'

@Controller('routes')
export class RoutesController {
    constructor(
        private readonly routesService: RoutesService,
        private readonly neo4jService: Neo4jService
    ) {}

    get(
        @Param('startNodeId') startNodeLat: number,
        @Param('endNodeId') startNodeLong: number, 
        @Param('startNodeId') startNodeLat: number,
        @Param('endNodeId') startNodeLong: number, ) {
            const 
        }

    @Post()
    create(@Body() createRouteDto: CreateRouteDto) {
        return this.routesService.create(createRouteDto)
    }

    @Get()
    async findAll() {
        return this.routesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.routesService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
        return this.routesService.update(+id, updateRouteDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.routesService.remove(+id)
    }
}
