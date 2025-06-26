import { useShallow } from 'zustand/react/shallow';
import { Block } from '@/components/styles/block';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
// TODO Add the following imports:
// import { EmailAnnotations } from "./email-annotations";
// import { EmailAnnotationsSetting } from "./email-annotations-setting";
import { useBuilderStore } from '@/hooks/use-builder-store';
import { SettingCard } from '@/components/card/setting-card';
import { UTMParameters } from './utm-parameters';
import { EmailAnnotations } from './email-annotations';
import { UTMParametersField } from './utm-parameters-fields';
import { EmailAnnotationsSetting } from './email-annotations-setting';

export function Message() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  return (
    <SettingCard>
      <Block title="Subject" control>
        <Textarea
          placeholder="Enter subject"
          value={meta.subject}
          onChange={(e) => setMetaByKey('subject', e.target.value)}
          rows={3}
        />
      </Block>

      <Separator />

      <Block title="Preheader" control>
        <Textarea
          placeholder="Enter preheader"
          value={meta.preheader}
          onChange={(e) => setMetaByKey('preheader', e.target.value)}
          rows={5}
        />
      </Block>

      <Separator />

      <EmailAnnotations />

      <EmailAnnotationsSetting />

      <Separator />

      <UTMParameters />

      <UTMParametersField />
    </SettingCard>
  );
}
