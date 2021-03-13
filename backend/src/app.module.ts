import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Neo4jModule } from 'nest-neo4j/dist'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './routes/routes.module'
import { NodesModule } from './nodes/nodes.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        Neo4jModule.fromEnv(),
        RoutesModule,
        NodesModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
