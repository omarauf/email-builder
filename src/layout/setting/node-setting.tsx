import { useShallow } from 'zustand/react/shallow';
import type { Node } from '@/types';
import { StripeSetting } from '@/nodes/stripe/setting';
import { TextSetting } from '@/nodes/block-text/setting';
import { CodeSetting } from '@/nodes/block-code/setting';
import { MenuSetting } from '@/nodes/block-menus/setting';
import { ImageSetting } from '@/nodes/block-image/setting';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { SettingCard } from '@/components/card/setting-card';
import { StructureSetting } from '@/nodes/structure/setting';
import { ContainerSetting } from '@/nodes/container/setting';
import { ButtonSetting } from '@/nodes/block-button/setting';
import { SpacerSetting } from '@/nodes/block-spacer/setting';
import { DividerSetting } from '@/nodes/block-divider/setting';

interface Props {
  selectedNode: Node;
}

export function NodeSetting({ selectedNode }: Props) {
  const [selectNode, selectParent] = useBuilderStore(
    useShallow((s) => [s.selectNode, s.selectParent])
  );

  let setting: React.ReactNode = null;
  let title = '';

  if (selectedNode.type === 'stripe') {
    title = 'Stripe';
    setting = <StripeSetting selectedStripe={selectedNode} />;
  }

  if (selectedNode.type === 'structure') {
    title = 'Structure';
    setting = <StructureSetting selectedStructure={selectedNode} />;
  }

  if (selectedNode.type === 'container') {
    title = 'Container';
    setting = <ContainerSetting selectedContainer={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'text') {
    title = 'Text Block';
    setting = <TextSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'image') {
    title = 'Image Block';
    setting = <ImageSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'button') {
    title = 'Button Block';
    setting = <ButtonSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'spacer') {
    title = 'Spacer Block';
    setting = <SpacerSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'divider') {
    title = 'Divider Block';
    setting = <DividerSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'menu') {
    title = 'Menu Block';
    setting = <MenuSetting selectedBlock={selectedNode} />;
  }

  if (selectedNode.type === 'block' && selectedNode.blockType === 'code') {
    title = 'Code Block';
    setting = <CodeSetting selectedBlock={selectedNode} />;
  }

  return (
    <SettingCard
      title={title}
      actionButton={{
        left: {
          icon: 'solar:close-circle-linear',
          onClick: () => selectNode(undefined),
        },
        right:
          selectedNode.type !== 'stripe'
            ? {
                icon: 'lets-icons:up',
                onClick: () => selectParent(),
                style: { transform: 'scaleX(-1)' },
              }
            : undefined,
      }}>
      {setting}
    </SettingCard>
  );
}
