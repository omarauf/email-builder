import { z } from 'zod';

const EmailTemplateParamsSchema = z.object({
  tree: z.unknown(),
  styles: z.unknown(),
  meta: z.unknown(),
});

const EmailTemplateAssetsSchema = z.object({
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
