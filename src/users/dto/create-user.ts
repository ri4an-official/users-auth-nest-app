import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

class CreateUserDto {
	@ApiProperty({ example: 'user@mail', description: 'User Email' })
	@IsString({ message: 'Must be string' })
	@IsEmail({}, { message: 'Is not email' })
	readonly email: string

	@ApiProperty({ example: '123', description: 'User Password' })
	@IsString({ message: 'Must be string' })
	@Length(4, 16, { message: 'Length must be more 4 & less 16' })
	readonly password: string
}
export default CreateUserDto
