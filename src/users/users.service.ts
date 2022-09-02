import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from './../roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
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
		const role = await this.roleService.get('ADMIN')
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}
	async getAll() {
		const users = await this.userRepo.findAll({ include: { all: true } })
		return users
	}
	async getByEmail(email: string) {
		const user = await this.userRepo.findOne({
			where: { email },
			include: { all: true },
		})
		return user
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepo.findByPk(dto.userId)
		const role = await this.roleService.get(dto.value)
		if (!user || !role)
			throw new HttpException(
				'User or Role not found!',
				HttpStatus.BAD_REQUEST
			)
		user.$add('roles', role.id)
		return dto
	}
}
