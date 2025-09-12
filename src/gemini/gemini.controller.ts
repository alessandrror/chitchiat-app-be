import { type Response } from 'express';
import { GeminiService } from './gemini.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body, Res, Sse } from '@nestjs/common';
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

  @Post()
  @Sse('streamContent')
  @ApiBody({
    type: CreateGenerateContentRequest,
    description: 'The content to generate',
    required: true,
  })
  async createGenerateContentStream(
    @Body() body: CreateGenerateContentRequest,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
      for await (const chunk of await this.geminiService.createGenerateContentStream(
        {
          data: body.contents[0],
        },
      )) {
        if (chunk && chunk.content) {
          const message = JSON.stringify({ content: chunk.content });
          for (const line of message.split('\n\n')) {
            res.write(`data: ${line}\n\n`);
          }
        }
      }
    } catch (error) {
      console.error(error);
      res.write(`data: ${error}\n\n`);
    } finally {
      res.write('event: close\n\n');
      res.end('data: {"DONE"}\n\n');
    }
  }
}
