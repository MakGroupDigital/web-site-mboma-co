import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().min(1).max(65535).default(8787),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(465),
  SMTP_SECURE: z.enum(['true', 'false']).default('true').transform((value) => value === 'true'),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  MAIL_FROM_NAME: z.string().default('MboMa & Co.'),
  MAIL_FROM_ADDRESS: z.string().email(),
  ADMIN_EMAIL: z.string().email(),
});

export const loadConfig = () => {
  const env = envSchema.parse(process.env);
  return {
    ...env,
    allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
  };
};

export type AppConfig = ReturnType<typeof loadConfig>;
