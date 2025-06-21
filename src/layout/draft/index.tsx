import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useShallow } from 'zustand/react/shallow';
import { Box, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { EmailTemplateCard } from '@/components/email-card';

interface Props {
  isCreate: boolean;
}

export function DraftTemplateDialog({ isCreate }: Props) {
  const [init, getDrafts, deleteDraft] = useBuilderStore(
    useShallow((s) => [s.init, s.getDrafts, s.deleteDraft])
  );
  const [drafts, setDraft] = useState(getDrafts());
  const [open, setOpen] = useState(isCreate && drafts.length > 0);

  const onClose = () => setOpen(false);

  const deleteHandler = (id: string) => {
    deleteDraft(id);
    const newDraft = getDrafts();
    setDraft(newDraft);
    setOpen(isCreate && newDraft.length > 0);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Draft Templates</DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Manage your draft templates here.
        </Typography>

        <Stack direction="row" spacing={4}>
          {drafts.map((d) => (
            <Box position="relative" key={d.id}>
              <EmailTemplateCard
                html={d.html}
                date={d.createAt}
                name="Draft"
                onClick={() => {
                  init({ template: d.params, id: d.id });
                  onClose();
                }}
              />

              <IconButton
                sx={{ position: 'absolute', top: 4, right: 4 }}
                onClick={() => deleteHandler(d.id)}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
