import { useState, useEffect } from 'react';
import type { DraftEmailTemplate } from '../types';

export function useDraftTemplate() {
  const [draftTemplate, setDraftTemplate] = useState<DraftEmailTemplate[]>([]);

  useEffect(() => {
    const templates = localStorage.getItem('draft-templates');

    if (templates === null) return;

    setDraftTemplate(JSON.parse(templates));
  }, []);

  return { draftTemplate };
}
