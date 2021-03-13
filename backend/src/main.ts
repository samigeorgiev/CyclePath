import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        credentials: true,
        origin: [/(www|http:|https:)+[^\s]+[\w]/]
    })
    app.use(cookieParser())

    await app.listen(3000)
}
bootstrap()
