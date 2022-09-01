import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { optionId } from '../config'
import { User } from '../users/users.model'
import { Role } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UsersRoles extends Model<UsersRoles> {
	@Column(optionId)
	id: number

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number
}
