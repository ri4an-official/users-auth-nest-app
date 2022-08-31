import { DataType } from 'sequelize-typescript'
import { ModelAttributeColumnOptions } from 'sequelize/types'

type DefaultColumn = Partial<ModelAttributeColumnOptions>

export const optionId: DefaultColumn = {
	type: DataType.INTEGER,
	unique: true,
	autoIncrement: true,
	primaryKey: true,
}
