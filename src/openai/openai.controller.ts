import { OpenaiService } from './openai.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateChatCompletionRequest } from './dto/create-chat-completion.request';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chatCompletion')
  async createChatCompletion(@Body() body: CreateChatCompletionRequest) {
    return this.openaiService.createChatCompletion(body.messages);
  }
}
