import { Test, TestingModule } from '@nestjs/testing';
import { GeminiController } from './gemini.controller';
import { response } from 'express';

describe('GeminiController', () => {
  let controller: GeminiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeminiController],
    }).compile();

    controller = module.get<GeminiController>(GeminiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGenerateContent', () => {
    it('should return a string', () => {
      expect(
        controller.createGenerateContent({
          contents: [
            {
              role: 'human',
              content: 'Ola',
            },
          ],
          model: {
            name: 'gemini-2.5-flash',
          },
        }),
      ).toBeInstanceOf(String);
    });
  });

  describe('createGenerateContentStream', () => {
    it('should return a string', () => {
      expect(
        controller.createGenerateContentStream(
          {
            contents: [
              {
                role: 'human',
                content: 'Ola',
              },
            ],
            model: {
              name: 'gemini-2.5-flash',
            },
          },
          response,
        ),
      ).toBeInstanceOf(String);
    });
  });
});
