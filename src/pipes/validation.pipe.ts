import { ValidationException } from './../exceptions/validation.exception'
import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		const obj = plainToClass(metadata.metatype, value)
		const errors = await validate(obj)

		if (errors.length) {
			const messages = errors.map((e) => {
				return `${e.property} - ${Object.values(e.constraints).join(', ')}`
			})
			throw new ValidationException(messages)
		}
		return value
	}
}
