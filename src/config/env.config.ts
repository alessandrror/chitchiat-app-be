import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  GEMINI_API_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = () => {
  try {
    const parsed = envSchema.parse(process.env);
    console.log('Environment variables loaded successfully');
    return parsed;
  } catch (error) {
    console.error(error);
    console.log('Failed to load environment variables');
    process.exit(1);
  }
};
