import type { z } from 'zod';
import type { EmailTemplateSchema } from '../schemas';
import type { Tree } from '../nodes/tree/type';
import type { Styles } from '../styles/type';
import type { Meta } from './meta';

export type EmailTemplate = z.infer<typeof EmailTemplateSchema>;

export type EmailTemplateAssets = EmailTemplate['assets'];

export interface EmailTemplateParams {
  tree: Tree;
  styles: Styles;
  meta: Meta;
}

// -------------------------------------------------- Item -------------------------------------------------

export interface DraftEmailTemplate {
  id: string;
  createAt: string;
  params: EmailTemplateParams;
}

export interface DefaultTemplate<T extends string = string> {
  name: T;
  params: EmailTemplateParams;
  thumbnail: string;
  language: string;
  description: string;
}
