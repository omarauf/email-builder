import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Iconify } from '@/components/iconify';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { blockStyle } from '@/components/styles';
import { Block } from '@/components/styles/block';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function UTMParametersField() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  if (meta.utmParameters.enable === false) return null;

  const onChangeHandler = (v: boolean) => {
    if (v) setMetaByKey('utmParameters.custom', [{ name: '', value: '' }]);
    else setMetaByKey('utmParameters.custom', []);
  };

  const { custom } = meta.utmParameters;

  const addCustomParameter = () => {
    if (custom.length >= 5) {
      toast.error('Maximum 5 custom UTM parameters allowed');
      return;
    }

    const isKeyEmpty = custom.some((p) => p.name === '');
    const isValueEmpty = custom.some((p) => p.value === '');

    if (isKeyEmpty || isValueEmpty) {
      toast.error('Custom UTM parameters cannot be empty');
      return;
    }

    setMetaByKey('utmParameters.custom', [...custom, { name: '', value: '' }]);
  };

  const removeCustomParameter = (index: number) => {
    setMetaByKey(
      'utmParameters.custom',
      custom.filter((_, i) => i !== index)
    );
  };

  const staticParams = [
    {
      key: 'source',
      placeholder: 'newsletter',
      value: meta.utmParameters.source,
    },
    { key: 'medium', placeholder: 'email', value: meta.utmParameters.medium },
    {
      key: 'campaign',
      placeholder: 'New_Message',
      value: meta.utmParameters.campaign,
    },
    {
      key: 'content',
      placeholder: 'link, landing page',
      value: meta.utmParameters.content,
    },
    {
      key: 'term',
      placeholder: 'free, -20%, registration',
      value: meta.utmParameters.term,
    },
  ] as const;

  return (
    <>
      <Separator />

      <div className={cn(blockStyle.py, 'flex flex-col gap-4')}>
        {staticParams.map((p) => (
          <Block key={p.key} title={p.key} control className="py-0">
            <Input
              placeholder={p.placeholder}
              value={p.value || ''}
              onChange={(e) =>
                setMetaByKey(
                  `utmParameters.${p.key}`,
                  e.target.value.replace(/[^a-zA-Z0-9_]/g, '_')
                )
              }
            />
          </Block>
        ))}
      </div>

      <Separator />

      <Block
        title="Custom UTM Parameters"
        control={<Switch checked={custom.length !== 0} onCheckedChange={onChangeHandler} />}>
        <p className="text-muted-foreground text-sm">
          This allows you to add your own parameters for all links at one time. If you need to add a
          unique parameter for some link you could add it in the options of a specific link.
        </p>

        {custom.length > 0 && (
          <div className="flex flex-col gap-2">
            {custom.map((p, i) => (
              <div key={`${p.name}-${p.value}`} className="flex flex-row space-x-1 py-1">
                <Input
                  placeholder="Key"
                  value={p.name}
                  onChange={(e) =>
                    setMetaByKey(
                      `utmParameters.custom.${i}.name`,
                      e.target.value.replace(/[^a-zA-Z0-9_]/g, '_')
                    )
                  }
                />
                <Input
                  placeholder="Value"
                  value={p.value}
                  onChange={(e) =>
                    setMetaByKey(
                      `utmParameters.custom.${i}.value`,
                      e.target.value.replace(/[^a-zA-Z0-9_]/g, '_')
                    )
                  }
                />

                <Button size="icon" variant="destructive" onClick={() => removeCustomParameter(i)}>
                  <Iconify icon="solar:trash-bin-trash-bold" color="white" width={22} />
                </Button>
              </div>
            ))}

            <Button size="icon" variant="secondary" onClick={addCustomParameter}>
              <Iconify color="white" icon="ic:baseline-plus" width={24} />
            </Button>
          </div>
        )}
      </Block>
    </>
  );
}
