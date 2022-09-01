import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { optionId } from '../config'
import { User } from './../users/users.model'
import CreateRolesDto from './dto/create-role'
import { UsersRoles } from './users-roles.model'

@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRolesDto> {
	@ApiProperty({ example: '1', description: 'User ID' })
	@Column(optionId)
	id: number

	@ApiProperty({ example: 'USER' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	value: string

	@ApiProperty({ example: 'Default Role' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string

	@BelongsToMany(() => User, () => UsersRoles)
	users: User[]
}
