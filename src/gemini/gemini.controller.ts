import { GeminiService } from './gemini.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateGenerateContentRequest } from './dto/create-generate-content.request';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generateContent')
  @ApiBody({
    type: CreateGenerateContentRequest,
    description: 'The content to generate',
    required: true,
  })
  async createGenerateContent(@Body() body: CreateGenerateContentRequest) {
    return this.geminiService.createGenerateContent({
      data: body.contents[0],
    });
  }
}
