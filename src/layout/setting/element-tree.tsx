// interface CustomLabelProps {
//   children: string;
//   className: string;
//   id: string;
// }

// function CustomLabel({ children, className, id }: CustomLabelProps) {
//   const selectNodeById = useBuilderStore((s) => s.selectNodeById);

//   return (
//     <div className={cn('flex grow justify-between gap-8', className)}>
//       <p className="text-sm">{children}</p>

//       <div className="flex items-center px-2">
//         <Iconify
//           icon="qlementine-icons:go-last-16"
//           width={16}
//           onClick={(e) => {
//             e.stopPropagation();
//             selectNodeById(id);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// const CustomTreeItem = forwardRef((props: TreeItem2Props, ref: React.Ref<HTMLLIElement>) => (
//   <TreeItem2
//     {...props}
//     ref={ref}
//     slots={{ label: CustomLabel }}
//     slotProps={{ label: { id: props.itemId } as CustomLabelProps }}
//   />
// ));

export function TreeView() {
  // const tree = useBuilderStore((s) => s.tree);

  // const items = tree.children.map((stripe, stripeIdx) => ({
  //   id: String(stripe.id),
  //   label: `Stripe - ${stripeIdx + 1}`,
  //   children: stripe.children.map((structure, structureIdx) => ({
  //     id: String(structure.id),
  //     label: `Structure - ${structureIdx + 1}`,
  //     children: structure.children.map((container, containerIdx) => ({
  //       id: String(container.id),
  //       label: `Container - ${containerIdx + 1}`,
  //       children: container.children.map((block, blockIdx) => ({
  //         id: String(block.id),
  //         label: `Block - ${blockIdx + 1}`,
  //       })),
  //     })),
  //   })),
  // }));

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
