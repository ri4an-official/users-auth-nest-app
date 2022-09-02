import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import CreateUserDto from './../users/dto/create-user'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: CreateUserDto) {
		return this.authService.login(dto)
	}

	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto)
	}
}
