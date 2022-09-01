import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateRoleDto from './dto/create-role'
import { Role } from './roles.model'

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

	async create(dto: CreateRoleDto) {
		const role = await this.roleRepo.create(dto)
		return role
	}

	async getAll() {
		const roles = await this.roleRepo.findAll()
		return roles
	}

	async get(value: string) {
		const role = await this.roleRepo.findOne({
			where: { value },
			include: { all: true },
		})
		return role
	}
}
