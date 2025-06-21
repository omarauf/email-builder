import { Stack, Button } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { EmailTemplateParams } from '@/types';
import { useBoolean } from '@/hooks/use-boolean';
import { XToggleButtonGroup } from '@/components/buttons';
import { EmailPreview } from './email-preview';

export interface EmailTemplateHeaderProps {
  onSubmit: (params: EmailTemplateParams, html: string, text: string) => void;
}

export function EmailTemplateHeader({ onSubmit }: EmailTemplateHeaderProps) {
  const preview = useBoolean();

  const [screen, setScreen, getAsImage, getAsCode, getAsText, getAsHtml, getAsParams, reset] =
    useBuilderStore(
      useShallow((s) => [
        s.screen,
        s.setScreen,
        s.getAsImage,
        s.getAsCode,
        s.getAsText,
        s.getAsHtml,
        s.getAsParams,
        s.reset,
      ])
    );

  const copy = () => {
    const code = getAsCode();
    navigator.clipboard.writeText(code);
    toast('HTML copied to clipboard');
  };

  const download = async () => {
    await getAsImage('desktop', 'desktop.png');
  };

  return (
    <>
      <Stack
        direction="row"
        py={2}
        px={2}
        bgcolor="background.default"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.divider,
        }}>
        <Stack direction="row" spacing={2} alignItems="center" />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>

          <Button variant="outlined" onClick={download}>
            Download
          </Button>

          <Button variant="outlined" onClick={copy}>
            Copy Code
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const html = getAsHtml();
              navigator.clipboard.writeText(html);
              toast('HTML copied to clipboard');
            }}>
            Copy HTML
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const html = getAsHtml();
              navigator.clipboard.writeText(
                html.replace(/\s+/g, ' ').replaceAll(`"`, `\\"`).trim()
              );
              toast('HTML copied to clipboard');
            }}>
            Copy HTML as String
          </Button>

          <XToggleButtonGroup
            value={screen}
            onChange={(v) => v && setScreen(v)}
            size="small"
            buttons={[
              { value: 'mobile', title: 'Mobile' },
              { value: 'desktop', title: 'Desktop' },
            ]}
          />

          <Button variant="contained" color="primary" onClick={preview.onTrue}>
            Preview
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const html = getAsHtml();
              const params = getAsParams();
              const text = getAsText();

              onSubmit(params, html, text);
            }}>
            Save & Submit
          </Button>
        </Stack>
      </Stack>

      <EmailPreview open={preview.value} onClose={preview.onFalse} />
    </>
  );
}
