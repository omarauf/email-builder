import { toast } from 'sonner';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/hooks/use-builder-store';
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

export function EmailPreview() {
  const [getAsHtml, getAsImage] = useBuilderStore(useShallow((s) => [s.getAsHtml, s.getAsImage]));
  const html = getAsHtml();

  const copyHtmlHandler = useCallback(() => {
    navigator.clipboard.writeText(html);
    toast('HTML copied to clipboard');
  }, [html]);

  const mobileImage = useCallback(() => getAsImage('mobile', 'mobile.png'), [getAsImage]);

  const desktopImage = useCallback(() => getAsImage('desktop', 'desktop.png'), [getAsImage]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>

      <DialogContent className="flex h-4/5 flex-col sm:max-w-4/5">
        <DialogHeader>
          <DialogTitle>Preview Email Template</DialogTitle>
          <DialogDescription>
            Email templates can be previewed in both desktop and mobile views. You can also download
            the HTML or images of the previews.
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-full justify-around">
          <div className="w-[800px] border">
            {/* <ShadowComponent html={html} /> */}
            <iframe title="Desktop View" srcDoc={html} width="100%" height="100%" />
          </div>

          <div className="w-[320px] border">
            <iframe title="Mobile View" srcDoc={html} width="320" height="100%" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button variant="outline" color="primary" onClick={copyHtmlHandler}>
            Copy HTML
          </Button>

          <Button variant="outline" color="primary" onClick={mobileImage}>
            Download Mobile
          </Button>

          <Button variant="outline" color="primary" onClick={desktopImage}>
            Download Desktop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
