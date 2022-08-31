import { ApiProperty } from '@nestjs/swagger'

class CreateUserDto {
	@ApiProperty({ example: 'user@mail', description: 'User Email' })
	readonly email: string

	@ApiProperty({ example: '123', description: 'User Password' })
	readonly password: string
}
export default CreateUserDto
