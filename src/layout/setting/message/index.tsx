import { Divider } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
// TODO Add the following imports:
// import { EmailAnnotations } from "./email-annotations";
// import { EmailAnnotationsSetting } from "./email-annotations-setting";
import { useBuilderStore } from '@/hooks/use-builder-store';
import { SettingCard } from '@/components/card/setting-card';
import { Block } from '@/components/styles/block';
import { UTMParametersField } from './utm-parameters-fields';
import { UTMParameters } from './utm-parameters';

export function Message() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  return (
    <SettingCard>
      <Block title="Subject" control>
        <XField.Text
          placeholder="Enter subject"
          value={meta.subject}
          onChange={(v) => setMetaByKey('subject', v)}
          multiline
          rows={3}
          sx={{ '& .MuiInputBase-multiline': { pt: 1 } }}
          slotProps={{ input: { variant: 'filled' } }}
        />
      </Block>

      <Divider sx={{ borderBottomWidth: 2 }} />

      <Block title="Preheader" control>
        <XField.Text
          placeholder="Enter preheader"
          value={meta.preheader}
          onChange={(v) => setMetaByKey('preheader', v)}
          multiline
          rows={4}
          sx={{ '& .MuiInputBase-multiline': { pt: 1 } }}
          slotProps={{ input: { variant: 'filled' } }}
        />
      </Block>

      {/* <Divider sx={{ borderBottomWidth: 2 }} />

      <EmailAnnotations />

      <EmailAnnotationsSetting /> */}

      <Divider sx={{ borderBottomWidth: 2 }} />

      <UTMParameters />

      <UTMParametersField />
    </SettingCard>
  );
}
