import { Module } from '@nestjs/common'
import { CatsController } from '../cats/cats.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [],
	controllers: [AppController, CatsController],
	providers: [AppService],
})
export class AppModule {}