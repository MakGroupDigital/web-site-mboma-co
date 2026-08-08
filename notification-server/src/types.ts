import { z } from 'zod';

export const formTypes = [
  'technology_partnership',
  'technology_audit',
  'digitalization',
  'app_idea',
  'ai_automation',
  'audit_booking',
  'masterclass',
] as const;

export type FormType = (typeof formTypes)[number];

export const notificationSchema = z.object({
  formType: z.enum(formTypes),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  organisation: z.string().trim().max(160).optional().default(''),
  referenceNumber: z.string().trim().min(3).max(100),
  submissionDate: z.string().trim().min(1).max(60),
  status: z.string().trim().max(100).optional().default(''),
  details: z.record(z.string().max(2000)).optional().default({}),
  website: z.string().max(200).optional().default(''),
}).strict();

export type NotificationPayload = z.infer<typeof notificationSchema>;
