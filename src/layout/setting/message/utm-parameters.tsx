import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Typography } from '@mui/material';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block } from '@/components/styles/block';

export function UTMParameters() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  const onChangeHandler = (v: boolean) => {
    if (v === false) setMetaByKey('utmParameters', { enable: false, custom: [] });
    else setMetaByKey('utmParameters', { enable: true, custom: [] });
  };

  return (
    <Block
      title="UTM Parameters"
      control={<XField.Switch value={meta.utmParameters.enable} onChange={onChangeHandler} />}>
      <Typography variant="caption" color="textSecondary">
        This option will add campaign parameters (UTM tags) to all URLs in the email, allowing you
        to track your campaign’s results in Google Analytics.
      </Typography>
    </Block>
  );
}
