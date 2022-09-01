import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './../roles/roles.model'
import { RolesModule } from './../roles/roles.module'
import { UsersRoles } from './../roles/users-roles.model'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User, Role, UsersRoles]), RolesModule],
	exports: [UsersService],
})
export class UsersModule {}
