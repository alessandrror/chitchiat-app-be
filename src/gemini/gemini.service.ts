import { Injectable } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { CreateGenerateContentDto } from './dto/create-generate-content.request';

type GeminiGenerateContentParams = {
  data: CreateGenerateContentDto;
};

@Injectable()
export class GeminiService {
  constructor(private readonly llm: ChatGoogleGenerativeAI) {}

  async createGenerateContent({ data }: GeminiGenerateContentParams) {
    return await this.llm.invoke([new HumanMessage(data)]);
  }
}
