import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import CreateRoleDto from './dto/create-role'
import { Role } from './roles.model'
import { RolesService } from './roles.service'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private usersService: RolesService) {}

	@Post()
	@ApiResponse({ status: 200, type: Role })
	create(@Body() dto: CreateRoleDto) {
		return this.usersService.create(dto)
	}

	@ApiResponse({ status: 200, type: [Role] })
	getAll() {
		return this.usersService.getAll()
	}

	@ApiResponse({ status: 200, type: Role })
	@Get(':value')
	get(@Param('value') value: string) {
		return this.usersService.get(value)
	}
}
