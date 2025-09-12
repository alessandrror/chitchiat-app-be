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

  async createGenerateContentStream({ data }: GeminiGenerateContentParams) {
    return await this.llm.stream([new HumanMessage(data)]);
    // try {
    //   for await (const chunk of await this.llm.stream([
    //     new HumanMessage(data),
    //   ])) {
    //     if (chunk && chunk.content) {
    //       console.log(chunk.content);
    //       for (const line of (chunk.content as string).split('\n')) {
    //         console.log(`data: ${line}\n`);
    //         yield `data: ${line}\n`;
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    //   yield `data: ${error}\n`;
    // }

    // yield `event: close\n`;
    // yield `data: {}`;
  }
}
