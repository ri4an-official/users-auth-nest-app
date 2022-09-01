import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from './../roles/roles.service'
import CreateUserDto from './dto/create-user'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepo: typeof User,
		private roleService: RolesService
	) {}

	async create(dto: CreateUserDto) {
		const user = await this.userRepo.create(dto)
		const role = await this.roleService.get('USER')
		await user.$set('roles', [role.id])
		return user
	}
	async getAll() {
		const users = await this.userRepo.findAll({ include: { all: true } })
		return users
	}
}
