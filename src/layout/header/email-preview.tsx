import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'sonner';
import { Box, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function EmailPreview({ open, onClose }: Props) {
  const [getAsHtml, getAsImage] = useBuilderStore(useShallow((s) => [s.getAsHtml, s.getAsImage]));
  const html = getAsHtml();

  const copyHtmlHandler = useCallback(() => {
    navigator.clipboard.writeText(html);
    toast('HTML copied to clipboard');
  }, [html]);

  const mobileImage = useCallback(() => getAsImage('mobile', 'mobile.png'), [getAsImage]);

  const desktopImage = useCallback(() => getAsImage('desktop', 'desktop.png'), [getAsImage]);

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      <DialogTitle>Preview Email Template</DialogTitle>

      <DialogContent sx={{ typography: 'body2', overflow: 'hidden', height: '70vh' }}>
        <Stack direction="row" justifyContent="space-around" height={1}>
          <Box border="1px solid" borderColor="divider" width={800}>
            {/* <ShadowComponent html={html} /> */}
            <iframe title="Desktop View" srcDoc={html} width="100%" height="100%" />
          </Box>

          <Box border="1px solid" borderColor="divider" width={320}>
            <iframe title="Mobile View" srcDoc={html} width="320" height="100%" />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="contained" color="primary" onClick={copyHtmlHandler}>
          Copy HTML
        </Button>

        <Button variant="contained" color="primary" onClick={mobileImage}>
          Download Mobile
        </Button>

        <Button variant="contained" color="primary" onClick={desktopImage}>
          Download Desktop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
