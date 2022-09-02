import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/users.model'
import { ROLES_KEY } from './roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const req: Request = context.switchToHttp().getRequest()
		try {
			const requiredRoles: string[] = this.reflector.getAllAndOverride(
				ROLES_KEY,
				[context.getHandler(), context.getClass()]
			)
			if (!requiredRoles) return

			const authHeader: string = req.headers['authorization']
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token)
				throw new UnauthorizedException({ message: 'User not auth' })

			const user: User = this.jwtService.verify(token)
			req['user'] = user
			return user.roles.some((r) => requiredRoles.includes(r.value))
		} catch (e) {
			console.log(e.message)
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
		}
	}
}
