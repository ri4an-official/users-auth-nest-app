import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function start() {
	const PORT = process.env.PORT ?? 3000
	const app = await NestFactory.create(AppModule)

	await app
		.listen(PORT)
		.then(() => console.log(`\nStarted on http://localhost:${PORT}`))
}
start()
