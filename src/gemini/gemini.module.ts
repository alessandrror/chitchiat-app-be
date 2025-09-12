import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Module({
  controllers: [GeminiController],
  imports: [ConfigModule],
  providers: [
    GeminiService,
    {
      provide: ChatGoogleGenerativeAI,
      useFactory: (configService: ConfigService) =>
        new ChatGoogleGenerativeAI({
          model: 'gemini-2.5-flash',
          apiKey: configService.getOrThrow('GEMINI_API_KEY'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class GeminiModule {}
