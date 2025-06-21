import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import type { TreeItem2Props } from '@mui/x-tree-view';
// import { TreeItem2 } from '@mui/x-tree-view';
import { Iconify } from '@/components/iconify';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { SettingCard } from '@/components/card/setting-card';

interface CustomLabelProps {
  children: string;
  className: string;
  id: string;
}

function CustomLabel({ children, className, id }: CustomLabelProps) {
  const selectNodeById = useBuilderStore((s) => s.selectNodeById);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={4}
      flexGrow={1}
      className={className}>
      <Typography variant="body2">{children}</Typography>

      <Stack sx={{ px: 1 }} justifyContent="center">
        <Iconify
          icon="qlementine-icons:go-last-16"
          width={16}
          onClick={(e) => {
            e.stopPropagation();
            selectNodeById(id);
          }}
        />
      </Stack>
    </Stack>
  );
}

// const CustomTreeItem = forwardRef((props: TreeItem2Props, ref: React.Ref<HTMLLIElement>) => (
//   <TreeItem2
//     {...props}
//     ref={ref}
//     slots={{ label: CustomLabel }}
//     slotProps={{ label: { id: props.itemId } as CustomLabelProps }}
//   />
// ));

export function TreeView() {
  const tree = useBuilderStore((s) => s.tree);

  const items: TreeViewBaseItem[] = tree.children.map((stripe, stripeIdx) => ({
    id: String(stripe.id),
    label: `Stripe - ${stripeIdx + 1}`,
    children: stripe.children.map((structure, structureIdx) => ({
      id: String(structure.id),
      label: `Structure - ${structureIdx + 1}`,
      children: structure.children.map((container, containerIdx) => ({
        id: String(container.id),
        label: `Container - ${containerIdx + 1}`,
        children: container.children.map((block, blockIdx) => ({
          id: String(block.id),
          label: `Block - ${blockIdx + 1}`,
        })),
      })),
    })),
  }));

  return null;

  // return (
  //   <SettingCard title="Element Tree">
  //     <RichTreeView
  //       items={items}
  //       sx={{ overflowX: 'hidden', minHeight: 240, width: 1 }}
  //       slots={{ item: CustomTreeItem }}
  //     />
  //   </SettingCard>
  // );
}
