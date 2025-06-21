import { useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_TEMPLATES } from '@/templates';
import { useBuilderStore } from './use-builder-store';
import type { EmailTemplateParams } from '../types';

export type UseLoadTemplateProps =
  | // loading a predefined template this always on create mode
  {
      name: string;
      templateId?: undefined;
      params?: undefined;
    }

  // loading a template from the database this always on edit mode
  | {
      name?: undefined;
      templateId: string;
      params: EmailTemplateParams;
    };

export function useLoadTemplate({ name, templateId, params }: UseLoadTemplateProps) {
  const [init, saveDraft] = useBuilderStore(useShallow((s) => [s.init, s.saveDraft]));

  const beforeUnloadEventHandler = useCallback(() => {
    saveDraft();
  }, [saveDraft]);

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadEventHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadEventHandler);
    };
  }, [beforeUnloadEventHandler]);

  useEffect(() => {
    // use predefined template - create mode
    if (name !== undefined) {
      const selectedTemplate = DEFAULT_TEMPLATES.find(name);

      init({ template: selectedTemplate.params });

      return;
    }

    // use template from the database - edit mode
    // const data = parseEmailString(params.json);

    init({ template: params, templateId });

    //
  }, [init, name, params, templateId]);

  return name === undefined ? 'edit' : 'create';
}
