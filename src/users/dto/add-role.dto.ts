import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
	@ApiProperty({ example: 'ADMIN', description: 'Administrator' })
	readonly value: string

	@ApiProperty({ example: '1', description: 'User ID' })
	readonly userId: number
}
