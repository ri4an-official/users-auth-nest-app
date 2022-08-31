import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateUserDto from './dto/create-user'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepo: typeof User) {}
	async create(dto: CreateUserDto) {
		const user = this.userRepo.create(dto)
		return user
	}
	async getAll() {
		const users = this.userRepo.findAll()
		return users
	}
}
