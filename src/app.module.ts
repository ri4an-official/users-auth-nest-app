import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './roles/roles.model'
import { RolesModule } from './roles/roles.module'
import { UsersRoles } from './roles/users-roles.model'
import { User } from './users/users.model'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			autoLoadModels: true,
			models: [User, Role, UsersRoles],
		}),
		UsersModule,
		RolesModule,
		AuthModule,
	],
})
export class AppModule {}
