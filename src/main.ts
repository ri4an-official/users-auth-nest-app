import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const PORT = 3000
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app
		.listen(PORT)
		.then(() => console.log(`\nStarted on http://localhost:${PORT}`))
}
bootstrap()
