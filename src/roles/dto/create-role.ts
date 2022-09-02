import { ApiProperty } from '@nestjs/swagger'

class CreateRoleDto {
	@ApiProperty({ example: 'USER' })
	readonly value: string

	@ApiProperty({ example: 'Default Role' })
	readonly description: string
}
export default CreateRoleDto
