import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Neo4jModule } from 'nest-neo4j/dist'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './routes/routes.module'
import { NodesModule } from './nodes/nodes.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        Neo4jModule.fromEnv(),
        RoutesModule,
        NodesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
