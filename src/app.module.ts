import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenaiModule, GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
