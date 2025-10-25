import { type Response } from 'express';
import { GeminiService } from './gemini.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body, Res, Sse } from '@nestjs/common';
import { CreateGenerateContentRequest } from './dto/create-generate-content.request';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate-content')
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

  @Post('stream-content')
  @Sse()
  @ApiBody({
    type: CreateGenerateContentRequest,
    description: 'The content to generate',
    required: true,
  })
  async createGenerateContentStream(
    @Res() res: Response,
    @Body() body: CreateGenerateContentRequest,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.statusCode = 200;
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

// @Sse('stream')
// @ApiBody({
//   type: CreateGenerateContentRequest,
//   description: 'The content to generate',
//   required: true,
// })
// async stream(
//   @Query() query: {q: string},
// ): Promise<Observable<MessageEvent>> {
//   return new Observable<MessageEvent>(subscriber => {
//     console.log(query.q);
//     (async () => {
//       try {
//         const stream = await this.geminiService.createGenerateContentStream({
//           data: JSON.parse(query.q).contents[0],
//         });

//         for await (const chunk of stream) {
//           if (chunk && (chunk as any).content) {
//             subscriber.next({ data: { content: (chunk as any).content } });
//           }
//         }
//         // subscriber.next({ data: 'DONE' });
//         subscriber.complete();
//       } catch (error) {
//         subscriber.error(error);
//       }
//     })();
//   });
// }
