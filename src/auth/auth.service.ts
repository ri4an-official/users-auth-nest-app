import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import CreateUserDto from '../users/dto/create-user'
import { User } from '../users/users.model'
import { UsersService } from './../users/users.service'

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private jwtService: JwtService) {}

	async login(dto: CreateUserDto) {
		const user = await this.validate(dto)
		return this.generateToken(user)
	}

	async register({ email, password }: CreateUserDto) {
		const candidate = await this.userService.getByEmail(email)
		if (!!candidate)
			throw new HttpException(
				`User with email '${email}' exist!`,
				HttpStatus.BAD_REQUEST
			)

		const hashPwd = await hash(password, 5)
		const user = await this.userService.create({ email, password: hashPwd })

		return this.generateToken(user)
	}

	private generateToken(user: User) {
		const payload = { id: user.id, email: user.email, roles: user.roles }
		return { token: this.jwtService.sign(payload) }
	}
	private async validate(dto: CreateUserDto) {
		const user = await this.userService.getByEmail(dto.email)
		const isEqual = await compare(dto.password, user?.password ?? '')
		if (!user || !isEqual)
			throw new UnauthorizedException({
				message: 'Incorrect email or password',
			})
		return user
	}
}
