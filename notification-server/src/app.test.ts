import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';
import type { AppConfig } from './config.js';
import type { Mailer } from './mailer.js';
import { buildEmails } from './templates.js';

const config = {
  NODE_ENV: 'test',
  HOST: '0.0.0.0',
  PORT: 8787,
  ALLOWED_ORIGINS: 'https://www.mboma.org',
  SMTP_HOST: 'smtp.test',
  SMTP_PORT: 465,
  SMTP_SECURE: true,
  SMTP_USER: 'co@mboma.org',
  SMTP_PASS: 'test-only',
  MAIL_FROM_NAME: 'MboMa & Co.',
  MAIL_FROM_ADDRESS: 'co@mboma.org',
  ADMIN_EMAIL: 'co@mboma.org',
  allowedOrigins: ['https://www.mboma.org'],
} satisfies AppConfig;

const validPayload = {
  formType: 'digitalization',
  firstName: 'Marie',
  lastName: 'Mboma',
  email: 'marie@example.com',
  phone: '+243810000000',
  organisation: 'Entreprise Test',
  referenceNumber: 'DIGI-TEST-001',
  submissionDate: '08/08/2026',
  status: 'Nouvelle demande',
  details: { Objectif: 'Centraliser les opérations' },
  website: '',
};

describe('notification API', () => {
  it('embeds the MboMa logo reference in visitor and admin emails', () => {
    const emails = buildEmails(validPayload);
    expect(emails.user.html).toContain('cid:mboma-logo');
    expect(emails.admin.html).toContain('cid:mboma-logo');
  });

  it('labels Contexxe Cloud offer emails correctly', () => {
    const emails = buildEmails({ ...validPayload, formType: 'contexxe_cloud' });
    expect(emails.service).toBe('Contexxe Cloud');
    expect(emails.user.subject).toContain('Contexxe Cloud');
    expect(emails.admin.subject).toContain('Contexxe Cloud');
  });

  it('sends a validated form submission through the injected mailer', async () => {
    const sendSubmission = vi.fn().mockResolvedValue(undefined);
    const mailer = { sendSubmission, verify: vi.fn() } as unknown as Mailer;
    const app = createApp(config, mailer);

    const response = await request(app)
      .post('/api/notifications/form-submission')
      .set('Origin', 'https://www.mboma.org')
      .send(validPayload);

    expect(response.status).toBe(202);
    expect(sendSubmission).toHaveBeenCalledOnce();
  });

  it('rejects unknown form types and invalid email addresses', async () => {
    const sendSubmission = vi.fn();
    const mailer = { sendSubmission, verify: vi.fn() } as unknown as Mailer;
    const app = createApp(config, mailer);

    const response = await request(app)
      .post('/api/notifications/form-submission')
      .send({ ...validPayload, formType: 'free_email', email: 'invalid' });

    expect(response.status).toBe(400);
    expect(sendSubmission).not.toHaveBeenCalled();
  });

  it('silently absorbs honeypot submissions', async () => {
    const sendSubmission = vi.fn();
    const mailer = { sendSubmission, verify: vi.fn() } as unknown as Mailer;
    const app = createApp(config, mailer);

    const response = await request(app)
      .post('/api/notifications/form-submission')
      .send({ ...validPayload, website: 'bot-filled-field' });

    expect(response.status).toBe(202);
    expect(sendSubmission).not.toHaveBeenCalled();
  });
});
