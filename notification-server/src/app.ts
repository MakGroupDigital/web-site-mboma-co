import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import type { AppConfig } from './config.js';
import type { Mailer } from './mailer.js';
import { notificationSchema } from './types.js';

export const createApp = (config: AppConfig, mailer: Mailer) => {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed'));
    },
    methods: ['GET', 'POST'],
  }));
  app.use(express.json({ limit: '32kb' }));

  app.get('/health', (_request, response) => {
    response.json({ ok: true, service: 'mboma-notifications' });
  });

  app.post('/api/notifications/form-submission', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }), async (request, response) => {
    const parsed = notificationSchema.safeParse(request.body);
    if (!parsed.success) {
      return response.status(400).json({ ok: false, error: 'Données du formulaire invalides.' });
    }

    // Hidden honeypot field: bots commonly fill it, real visitors never see it.
    if (parsed.data.website) {
      return response.status(202).json({ ok: true });
    }

    try {
      await mailer.sendSubmission(parsed.data);
      return response.status(202).json({ ok: true });
    } catch (error) {
      console.error('SMTP delivery failed:', error);
      return response.status(502).json({ ok: false, error: 'Notification temporairement indisponible.' });
    }
  });

  app.use((_request, response) => response.status(404).json({ ok: false, error: 'Route introuvable.' }));
  return app;
};
