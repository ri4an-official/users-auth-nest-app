import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { ValidationPipe } from './../pipes/validation.pipe'
import { AddRoleDto } from './dto/add-role.dto'
import CreateUserDto from './dto/create-user'
import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('User')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200, type: User })
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAll()
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Add role' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto)
	}
}
