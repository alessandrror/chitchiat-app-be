import { Injectable } from '@nestjs/common';
import Gemini from '@google/genai';
import {
  CreateGenerateContentDto,
  GeminiModelDto,
} from './dto/create-generate-content.request';

type GeminiGenerateContentParams = {
  data: Array<CreateGenerateContentDto>;
  model: GeminiModelDto;
};

@Injectable()
export class GeminiService {
  constructor(private readonly gemini: Gemini.GoogleGenAI) {}

  async createGenerateContent({ data, model }: GeminiGenerateContentParams) {
    return this.gemini.models.generateContent({
      contents: data,
      model: model.name ?? 'gemini-2.5-flash',
    });
  }
}
