import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Box, Stack, Divider, Typography, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { toast } from 'sonner';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { blockStyle } from '@/components/styles';
import { Block } from '@/components/styles/block';

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
      <Divider sx={{ borderBottomWidth: 2 }} />

      <Stack spacing={1} sx={blockStyle}>
        {staticParams.map((p) => (
          <Block key={p.key} title={p.key} control sx={{ py: 0, px: 0 }}>
            <XField.Text
              size="small"
              placeholder={p.placeholder}
              value={p.value || ''}
              onChange={(v) =>
                setMetaByKey(`utmParameters.${p.key}`, v.replace(/[^a-zA-Z0-9_]/g, '_'))
              }
            />
          </Block>
        ))}
      </Stack>

      <Divider sx={{ borderBottomWidth: 2 }} />

      <Block
        title="Custom UTM Parameters"
        control={<XField.Switch value={custom.length !== 0} onChange={onChangeHandler} />}>
        <Typography variant="caption" color="textSecondary">
          This allows you to add your own parameters for all links at one time. If you need to add a
          unique parameter for some link you could add it in the options of a specific link.
        </Typography>

        {custom.length > 0 && (
          <Stack spacing={1}>
            {custom.map((p, i) => (
              <Stack key={`${p.name}-${p.value}`} direction="row" spacing={1} sx={{ py: 1 }}>
                <XField.Text
                  size="small"
                  placeholder="Key"
                  value={p.name}
                  onChange={(v) =>
                    setMetaByKey(`utmParameters.custom.${i}.name`, v.replace(/[^a-zA-Z0-9_]/g, '_'))
                  }
                  error={p.name === ''}
                />
                <XField.Text
                  size="small"
                  placeholder="Value"
                  value={p.value}
                  onChange={(v) =>
                    setMetaByKey(
                      `utmParameters.custom.${i}.value`,
                      v.replace(/[^a-zA-Z0-9_]/g, '_')
                    )
                  }
                  error={p.value === ''}
                />

                <IconButton onClick={() => removeCustomParameter(i)}>
                  <Iconify icon="solar:trash-bin-trash-bold" color="white" width={22} />
                </IconButton>
              </Stack>
            ))}

            <Box>
              <IconButton onClick={addCustomParameter}>
                <Iconify color="white" icon="ic:baseline-plus" width={24} />
              </IconButton>
            </Box>
          </Stack>
        )}
      </Block>
    </>
  );
}
