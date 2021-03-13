import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
    ValidationPipe
} from '@nestjs/common'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interfaces/auth-request.interface'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    get(
        @Param('startNodeId') startNodeLat: number,
        @Param('endNodeId') startNodeLong: number,
        @Param('startNodeId') endNodeLat: number,
        @Param('endNodeId') endNodeLong: number
    ) {
        const request = new GetRouteDto(startNodeLat, startNodeLong, endNodeLat, endNodeLong)
        // this.routesService.getRoute(request);
    }

    @Post('rate')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(
        @Req() req: AuthenticatedRequest,
        @Body(ValidationPipe) rateRouteDto: RateRouteDto
    ): Promise<void> {
        await this.routesService.rateRoute(rateRouteDto, req.user.id)

        return
    }
}
