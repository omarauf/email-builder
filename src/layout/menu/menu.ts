import type { NodeType } from '@/types';
import type { BlockType } from '@/nodes/block/type';

interface MenuItem {
  type: 'block';
  blockType: BlockType;
  icon: string;
  title: string;
}

export const menuItems: MenuItem[] = [
  {
    type: 'block',
    blockType: 'text',
    icon: 'solar:text-broken',
    title: 'Text',
  },
  {
    type: 'block',
    blockType: 'button',
    icon: 'lucide:mouse-pointer-square',
    title: 'Button',
  },
  {
    type: 'block',
    blockType: 'spacer',
    icon: 'fluent-mdl2:spacer',
    title: 'Spacer',
  },
  {
    type: 'block',
    blockType: 'divider',
    icon: 'fluent-mdl2:divider',
    title: 'Divider',
  },
  {
    type: 'block',
    blockType: 'image',
    icon: 'bi:image',
    title: 'Image',
  },
  {
    type: 'block',
    blockType: 'menu',
    icon: 'tabler:list',
    title: 'Menu',
  },
  {
    type: 'block',
    blockType: 'code',
    icon: 'tabler:code',
    title: 'Code',
  },
];

interface StructureItem {
  type: NodeType;
  icon: string;
  title: string;
}

export const structureItems: StructureItem[] = [
  // Stripe
  {
    type: 'stripe',
    icon: 'bi:layout-split',
    title: 'Stripe',
  },

  // Structures
  {
    type: 'structure',
    icon: 'bi:layout-split',
    title: 'Structure',
  },

  // Containers
  {
    type: 'container',
    icon: 'bi:layout-split',
    title: 'Container',
  },
];
