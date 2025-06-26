import { useShallow } from 'zustand/react/shallow';
import { Switch } from '@/components/ui/switch';
import { Block } from '@/components/styles/block';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function UTMParameters() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  const onChangeHandler = (v: boolean) => {
    if (v === false) setMetaByKey('utmParameters', { enable: false, custom: [] });
    else setMetaByKey('utmParameters', { enable: true, custom: [] });
  };

  return (
    <Block
      title="UTM Parameters"
      control={<Switch checked={meta.utmParameters.enable} onCheckedChange={onChangeHandler} />}>
      <p className="text-muted-foreground text-sm">
        This option will add campaign parameters (UTM tags) to all URLs in the email, allowing you
        to track your campaign’s results in Google Analytics.
      </p>
    </Block>
  );
}
