import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const useSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Nest-App API')
		.setDescription('Docs REST-API')
		.setVersion('1.0.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)
}

async function start() {
	const app = await NestFactory.create(AppModule)
	useSwagger(app)

	const PORT = process.env.PORT ?? 3000
	await app
		.listen(PORT)
		.then(() => console.log(`\nStarted on http://localhost:${PORT}`))
}
start()
