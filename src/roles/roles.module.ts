import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './../users/users.model'
import { RolesController } from './roles.controller'
import { Role } from './roles.model'
import { RolesService } from './roles.service'
import { UsersRoles } from './users-roles.model'

@Module({
	providers: [RolesService],
	controllers: [RolesController],
	imports: [SequelizeModule.forFeature([Role, User, UsersRoles])],
	exports: [RolesService],
})
export class RolesModule {}
