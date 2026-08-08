import nodemailer from 'nodemailer';
import type { AppConfig } from './config.js';
import { buildEmails } from './templates.js';
import type { NotificationPayload } from './types.js';

export const createMailer = (config: AppConfig) => {
  const transport = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
    requireTLS: !config.SMTP_SECURE,
    tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
  });

  const from = { name: config.MAIL_FROM_NAME, address: config.MAIL_FROM_ADDRESS };

  return {
    verify: () => transport.verify(),
    async sendSubmission(data: NotificationPayload) {
      const emails = buildEmails(data);
      await Promise.all([
        transport.sendMail({
          from,
          to: data.email,
          replyTo: config.ADMIN_EMAIL,
          subject: emails.user.subject,
          text: emails.user.text,
          html: emails.user.html,
          disableFileAccess: true,
          disableUrlAccess: true,
        }),
        transport.sendMail({
          from,
          to: config.ADMIN_EMAIL,
          replyTo: data.email,
          subject: emails.admin.subject,
          text: emails.admin.text,
          html: emails.admin.html,
          disableFileAccess: true,
          disableUrlAccess: true,
        }),
      ]);
    },
  };
};

export type Mailer = ReturnType<typeof createMailer>;
