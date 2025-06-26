import type { EmailTemplateData } from '@/types';
import * as Thumbnail from '@/assets';
import * as _default from './default';

interface DefaultTemplate<T extends string = string> {
  name: T;
  data: EmailTemplateData;
  thumbnail: string;
  language: string;
  description: string;
}

type DefaultTemplateName = 'default';

interface DefaultTemplateClass {
  templates: {
    [key in DefaultTemplateName]: DefaultTemplate<key>;
  };
  length: number;
  names: DefaultTemplateName[];
  loop: () => DefaultTemplate<DefaultTemplateName>[];
  find: (name: string) => DefaultTemplate<DefaultTemplateName>;
}

export const DEFAULT_TEMPLATES: DefaultTemplateClass = {
  templates: {
    default: {
      name: 'default',
      data: _default,
      thumbnail: Thumbnail.Default,
      language: 'en',
      description: 'Default email template',
    },
  },

  get length() {
    return Object.keys(this.templates).length;
  },

  get names() {
    return Object.keys(this.templates) as DefaultTemplateName[];
  },

  loop() {
    return this.names.map((name) => this.templates[name]);
  },

  find(name: string) {
    if (!this.names.includes(name as DefaultTemplateName)) return this.templates.default;

    return this.templates[name as DefaultTemplateName];
  },
};
