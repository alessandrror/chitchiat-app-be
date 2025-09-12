import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class GeminiModelDto {
  @IsString()
  @ApiProperty({
    example: 'gemini-2.5-flash',
    description: 'The model name to use for generation',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 0.7,
    description: 'Controls randomness (0.0 to 1.0)',
    required: false,
  })
  temperature?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 40,
    description: 'Maximum number of tokens to generate',
    required: false,
  })
  maxOutputTokens?: number;
}

export class CreateGenerateContentDto {
  @IsString()
  @ApiProperty({ example: 'human', description: 'The role of the content' })
  role: 'human' | 'AI' | 'system' | 'developer' | 'tool';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Hello World', description: 'The text of the part' })
  content: string;
}

export class CreateGenerateContentRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGenerateContentDto)
  @ApiProperty({
    type: [CreateGenerateContentDto],
    description: 'The contents to generate',
  })
  contents: CreateGenerateContentDto[];

  @ValidateNested()
  @Type(() => GeminiModelDto)
  @ApiProperty({
    type: GeminiModelDto,
    description: 'Model configuration',
  })
  model: GeminiModelDto;
}
