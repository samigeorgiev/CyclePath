import { Controller, Get, InternalServerErrorException, Query } from '@nestjs/common'
import { ILocation } from './interfaces'
import { SearchService } from './search.service'

@Controller('search')
export class SeachController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async get(
        @Query('query') query: string,
        @Query('location') location: string
    ): Promise<ILocation> {
        return await this.searchService.fetchGmaps(query, location)
    }
}
