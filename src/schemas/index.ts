import { z } from 'zod';

export const EmailTemplateParamsSchema = z.object({
  tree: z.unknown(),
  styles: z.unknown(),
  meta: z.unknown(),
});

export const EmailTemplateAssetsSchema = z.object({
  html: z.string(),
  text: z.string(),
  params: EmailTemplateParamsSchema.optional(), // Optional for HTML templates, required for DnD templates
});

export const EmailTemplateSchema = z.object({
  name: z.string().max(50, 'Template name is too long').min(1, 'Template name is too short'),
  description: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  language: z.string(),
  type: z.enum(['Dnd', 'Html']),
  assets: EmailTemplateAssetsSchema,
});

export const SendEmailSchema = z.object({
  senderId: z.string().uuid(),
  to: z.string().email('Invalid recipient email address'),
  subject: z.string().max(50, 'Subject is too long').min(1, 'Subject is too short'),
});
