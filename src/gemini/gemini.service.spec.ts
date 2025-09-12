import { Test, TestingModule } from '@nestjs/testing';
import { GeminiService } from './gemini.service';

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeminiService],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGenerateContent', () => {
    it('should return a string', () => {
      expect(
        service.createGenerateContent({
          data: {
            role: 'human',
            content: 'Ola',
          },
        }),
      ).toBeInstanceOf(String);
    });
  });

  describe('createGenerateContentStream', () => {
    it('should return a string', () => {
      expect(
        service.createGenerateContentStream({
          data: {
            role: 'human',
            content: 'Ola',
          },
        }),
      ).toBeInstanceOf(String);
    });
  });
});
