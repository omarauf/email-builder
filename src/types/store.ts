import type { RefObject } from 'react';
import type { Editor } from '@tiptap/react';
import type { FieldPath, PathValue } from 'react-hook-form';
import type {
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  CollisionDetection,
} from '@dnd-kit/core';
import type { Meta } from './meta';
import type { Index } from './idx';
import type { Node } from './node';
import type { Styles } from '../styles/type';
import type { Tree } from '../nodes/tree/type';
import type { DragData, OverData } from '../utils/node-utils';
import type { BlockTree, BlockType, BlockIndex } from '../nodes/block/type';
import type { ContainerTree, ContainerIndex } from '../nodes/container/type';
import type { StripeTree, StripeType, StripeIndex } from '../nodes/stripe/type';
import type { Layout, StructureTree, StructureIndex } from '../nodes/structure/type';

type ChangeCommand = 'init' | 'move' | 'delete' | 'clone' | 'add' | 'update';

export interface BuilderState {
  // Email Data
  tree: Tree;
  styles: Styles;
  meta: Meta;

  // Drag & Drop
  active: DragData | undefined;
  selectedNode: Node | undefined;
  editor: Editor | undefined;
  hoverEle: HTMLElement | undefined;
  isMouseInsideTree: boolean;

  // Editor
  // mode: BuilderMode;
  screen: 'mobile' | 'desktop';
  frameRef: RefObject<HTMLDivElement | null>;
  changeStack: { command: ChangeCommand; tree: Tree }[];
  hasChanges: boolean;

  // Loader
  wasmLoading: boolean;

  reset: VoidFunction;

  // Setter
  setScreen: (screen: 'mobile' | 'desktop') => void;
  setWasmLoading: (value: boolean) => void;
  setEditor: (editor: Editor | undefined) => void;
  setRef(ref: HTMLDivElement | null): void;
  setHoverEle: (ele: HTMLElement | undefined, isMouseInsideTree: boolean) => void;
  setGlobalStyleByKey: <U extends FieldPath<Styles>>(key: U, value: PathValue<Styles, U>) => void;
  setMetaByKey: <U extends FieldPath<Meta>>(key: U, value: PathValue<Meta, U>) => void;
  setStripeByKey: <T extends FieldPath<StripeTree>>(
    idx: StripeIndex,
    key: T,
    value: PathValue<StripeTree, T>
  ) => void;
  setStructureByKey: <T extends FieldPath<StructureTree>>(
    idx: StructureIndex,
    key: T,
    value: PathValue<StructureTree, T>
  ) => void;
  setContainerByKey: <T extends FieldPath<ContainerTree>>(
    idx: ContainerIndex,
    key: T,
    value: PathValue<ContainerTree, T>
  ) => void;
  setBlockByKey: <T extends FieldPath<BlockTree>>(
    idx: BlockIndex,
    key: T,
    value: PathValue<BlockTree, T>
  ) => void;

  // Loader
  init(obj: { tree: Tree; styles: Styles; meta: Meta }): void;
  fetchImages: VoidFunction;

  // Node Adder
  addStripe: (idx: StripeIndex, containerLayout: Layout) => void;
  addStructure: (idx: StructureIndex, containerLayout: Layout) => void;
  addContainer: (idx: ContainerIndex) => void;
  addBlock: (idx: BlockIndex | ContainerIndex, block: BlockTree | BlockType) => void;

  // Node Utils
  addNode: (activeData: DragData, overData: OverData) => void;
  deleteNode: (node: Node) => void;
  selectNode: (node?: Node) => void;
  selectNodeById: (nodeId: string) => void;
  cloneNode: (node: Node) => void;
  clearSelectedNode: VoidFunction;
  getParent: () => Node | undefined;
  isNodeExist: (id: UniqueIdentifier) => boolean;
  selectParent: VoidFunction;
  getParentStripeType: (node: Node) => StripeType;
  findBlockByType: (type: BlockType | BlockType[]) => BlockIndex[];
  moveNode: (activeData: DragData, overData: OverData) => void;
  getParentNode: (idx: Index) => Node;
  getNodeByIndex: (idx: Index) => Node;

  // Structure Container Width Utils
  getContainerWidth: (blockIdx: BlockIndex) => number;
  getStructureAvailableWidth: (idx: StructureIndex) => number;
  updateStructureContainerWidths: (idx: StructureIndex, newWidth: number[]) => void;
  changeStructureLayout: (idx: StructureIndex, newLayout: Layout) => void;
  adjustStructureContainerWidth: (
    idx: StructureIndex,
    updatedContainerWidth?: number,
    updatedContainerIndex?: number
  ) => void;

  // Drag & Drop Utils
  onDragCancel: VoidFunction;
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart: (event: DragStartEvent) => void;
  collisionDetectionStrategy: CollisionDetection;

  // Converter
  getAsHtml: () => string;
  getAsText: () => string;
  getAsCode: () => string;
  getAsParams: () => { tree: Tree; styles: Styles; meta: Meta };
  getAsImage: (type: 'mobile' | 'desktop', filename?: string) => Promise<void>;

  // Other Utils
  onGeneralDirChange: (dir: 'ltr' | 'rtl') => void;
  addChange: (command: ChangeCommand) => void;
}
