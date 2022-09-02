import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { optionId } from '../config'
import { UsersRoles } from '../roles/users-roles.model'
import { Role } from './../roles/roles.model'
import CreateUserDto from './dto/create-user'

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
	@ApiProperty({ example: '1', description: 'User ID' })
	@Column(optionId)
	id: number

	@ApiProperty({ example: 'user@mail', description: 'User Email' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string

	@ApiProperty({ example: '123', description: 'User Password' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string

	@ApiProperty({ example: 'true', description: 'User is banned' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean

	@ApiProperty({ example: 'Reason for ban', description: 'Ban for BM' })
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string

	@BelongsToMany(() => Role, () => UsersRoles)
	roles: Role[]
}
