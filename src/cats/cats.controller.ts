import { Controller, Get, Param, Post, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('cats')
export class CatsController {
	@Post('new')
	createCat() {
		return 'New cat'
	}
	@Get()
	findAll(@Req() request: Request) {
		return 'All cats'
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return `Cat id: ${id}`
	}
}
