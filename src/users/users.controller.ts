import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import CreateUserDto from './dto/create-user'
import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('User')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAll() {
		return this.usersService.getAll()
	}
}
