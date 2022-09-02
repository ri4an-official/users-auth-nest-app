import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from './../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	providers: [AuthService],
	controllers: [AuthController],
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_KEY ?? 'SECRET_KEY',
			signOptions: {
				expiresIn: '24h',
			},
		}),
		forwardRef(() => UsersModule),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
