import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import type { EmailTemplateData } from '@/types';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme';
import { XToggleButtonGroup } from '@/components/x-common';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { EmailPreview } from './email-preview';

export interface EmailTemplateHeaderProps {
  onSubmit?: (data: EmailTemplateData, html: string, text: string) => void;
}

export function EmailTemplateHeader({ onSubmit }: EmailTemplateHeaderProps) {
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
    <div className="flex justify-between border-b border-black p-4">
      <ModeToggle />

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>

        <Button variant="outline" onClick={download}>
          Download
        </Button>

        <Button variant="outline" onClick={copy}>
          Copy Code
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const html = getAsHtml();
            navigator.clipboard.writeText(html);
            toast('HTML copied to clipboard');
          }}>
          Copy HTML
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const html = getAsHtml();
            navigator.clipboard.writeText(html.replace(/\s+/g, ' ').replaceAll(`"`, `\\"`).trim());
            toast('HTML copied to clipboard');
          }}>
          Copy HTML as String
        </Button>

        <XToggleButtonGroup
          type="single"
          value={screen}
          onChange={(v) => v && setScreen(v)}
          buttons={[
            { value: 'mobile', title: 'Mobile' },
            { value: 'desktop', title: 'Desktop' },
          ]}
        />

        <EmailPreview />

        <Button
          variant="outline"
          onClick={() => {
            const html = getAsHtml();
            const params = getAsParams();
            const text = getAsText();

            onSubmit?.(params, html, text);
          }}>
          Save & Submit
        </Button>
      </div>
    </div>
  );
}
