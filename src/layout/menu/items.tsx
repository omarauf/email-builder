import { Stack } from '@mui/material';
import { DraggableElementItem } from './draggable-element';
import { DraggableStructure } from './draggable-structure';
import { menuItems } from './menu';

export function ElementItemsMenu() {
  return (
    <Stack spacing={2} sx={{ position: 'absolute', left: 0, zIndex: 2, p: 2 }}>
      <Stack
        position="relative"
        sx={{
          bgcolor: 'background.default',
          p: 1,
          borderRadius: 2,
          boxShadow: 16,
        }}
        spacing={2}>
        <DraggableStructure />
      </Stack>

      <Stack
        sx={{
          bgcolor: 'background.default',
          p: 1,
          borderRadius: 2,
          boxShadow: 16,
        }}
        spacing={2}>
        {menuItems.map((i) => (
          <DraggableElementItem
            key={i.title}
            type={i.type}
            blockType={i.blockType}
            icon={i.icon}
            title={i.title}
          />
        ))}
      </Stack>
    </Stack>
  );
}
