import { BadRequestException, HttpService, Injectable } from '@nestjs/common'
import { LocationDto } from './dto'

@Injectable()
export class SearchService {
    constructor(private readonly httpService: HttpService) {}

    async fetchGmaps(query: string, location: string): Promise<LocationDto> {
        // matches format like "123.1234,123.1234"
        const locationStringRegex = /(\d*\.)?\d+,+((\d*\.)?\d)+/

        if (!query || !locationStringRegex.test(location)) {
            throw new BadRequestException()
        }

        const res = await this.httpService
            .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    keyword: query,
                    location,
                    rankby: 'distance',
                    key: process.env.MAPS_KEY
                }
            })
            .toPromise()

        return res.data.results.map(result => ({
            name: result.name,
            ...result.geometry.location
        }))
    }
}
