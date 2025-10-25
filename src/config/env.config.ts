import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  GEMINI_API_KEY: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION_TIME: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.string().min(1),
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
