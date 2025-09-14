import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({ origin: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Chitchiat API')
    .setDescription('The Chitchiat API description')
    .setVersion('0.0.1')
    .addTag('chats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options = theme.getDefaultConfig(SwaggerThemeNameEnum.DARK);

  SwaggerModule.setup('swagger', app, documentFactory, options);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
