import Gemini from '@google/genai';
import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [GeminiController],
  imports: [ConfigModule],
  providers: [
    GeminiService,
    {
      provide: Gemini.GoogleGenAI,
      useFactory: (configService: ConfigService) =>
        new Gemini.GoogleGenAI({
          apiKey: configService.getOrThrow('GEMINI_API_KEY'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class GeminiModule {}
