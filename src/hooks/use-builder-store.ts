import type { StateCreator } from 'zustand';
import { toast } from 'sonner';
import { produce } from 'immer';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import ReactDOMServer from 'react-dom/server';
import { createRef, type RefObject } from 'react';
import { inline } from '@css-inline/css-inline-wasm';
import { isEqual, cloneDeep, set as _Set } from 'lodash';
import { subscribeWithSelector } from 'zustand/middleware';
import { closestCenter, rectIntersection } from '@dnd-kit/core';
import { distributeValue } from '@/utils/distribute-value';
import { emailTemplateThumbnail } from '@/utils/thumbnail';
import type { Screen, BuilderState } from '../types';
import type { BlockImage } from '../nodes/block-image/type';
import type { StructureTree } from '../nodes/structure/type';
import type { BlockTree, BlockIndex } from '../nodes/block/type';
import { parseLayouts } from '../utils/layout';
import * as nodeUtils from '../utils/node-utils';
import * as defaultTemplate from '../templates/default';
import { defaultBlock } from '../nodes/block/blueprint';
import { defaultStripe } from '../nodes/stripe/blueprint';
import { jsonToStringWithUndefined } from '../utils/parser';
import { adjustContainerWidth } from '../utils/container-width';
import { defaultStructure } from '../nodes/structure/blueprint';
import { defaultContainer } from '../nodes/container/blueprint';
import { DEFAULT_MOBILE_WIDTH } from '../styles/general/blueprint';
import { getImageMetaData, getImageDimension } from '../utils/image';
import { BodyTreeConverter, HTMLTreeConverter } from '../nodes/tree/converter';
import { isMouseInFrame, myClosestCorners } from '../utils/collision-detection';

const clonedStyles = cloneDeep(defaultTemplate.styles);
const clonedTree = cloneDeep(defaultTemplate.tree);
const clonedMeta = cloneDeep(defaultTemplate.meta);

const builderStore: StateCreator<BuilderState> = (set, get, store) => {
  store.subscribe((state, prevState) => {
    const doesTreeChanged = !isEqual(state.tree, prevState.tree);

    if (doesTreeChanged && prevState.hasChanges === false) {
      set({ hasChanges: true });
    }

    if (doesTreeChanged) {
      const { selectedNode } = state;
      if (!selectedNode) return;
      const { getNodeByIndex } = get();
      const newSelectedNode = getNodeByIndex(selectedNode.idx);
      set({ selectedNode: newSelectedNode });
    }
  });

  return {
    id: uuidv4(),

    // Email Data
    tree: clonedTree,
    styles: clonedStyles,
    meta: clonedMeta,

    // Drag & Drop
    active: undefined,
    selectedNode: undefined,
    editor: undefined,
    hoverEle: undefined,
    isMouseInsideTree: false,

    // Editor
    screen: 'desktop',
    frameRef: createRef<HTMLDivElement>(),
    changeStack: [],
    hasChanges: false,

    // Loader
    templateId: undefined,
    // emailVariationId: undefined,
    // emailVariations: undefined,
    wasmLoading: true,

    reset: () => {
      set({
        tree: clonedTree,
        styles: clonedStyles,
        meta: clonedMeta,
        hoverEle: undefined,
        screen: 'desktop',
        active: undefined,
        changeStack: [],
        isMouseInsideTree: false,
        selectedNode: undefined,
        editor: undefined,
        hasChanges: false,
      });
    },

    /* ------------------------------------------------ Setter ------------------------------------------------ */
    setScreen: (screen) => set({ screen }),

    setWasmLoading: (value) => set({ wasmLoading: value }),

    setEditor: (editor) => set({ editor }),

    setRef: (elementRef) => {
      if (!elementRef) {
        return;
      }
      const newRef = createRef() as RefObject<HTMLDivElement>;
      newRef.current = elementRef;
      set({ frameRef: newRef });
    },

    setHoverEle: (e, isMouseInsideTree) => set({ hoverEle: e, isMouseInsideTree }),

    setGlobalStyleByKey: (key, value) =>
      set(
        produce((state: BuilderState) => {
          _Set(state.styles, key, value);
        })
      ),

    setMetaByKey: (key, value) =>
      set((state) => {
        const newMeta = cloneDeep(state.meta);
        return { meta: _Set(newMeta, key, value) };
      }),

    setStripeByKey: (idx, key, value) => {
      set(
        produce((state: BuilderState) => {
          const k = `children.${idx.stripeIndex}.${key}`;
          _Set(state.tree, k, value);
        })
      );
    },

    setStructureByKey: (idx, key, value) => {
      set(
        produce((state: BuilderState) => {
          const k = `children.${idx.stripeIndex}.children.${idx.structureIndex}.${key}`;
          _Set(state.tree, k, value);
        })
      );
    },

    setContainerByKey: (idx, key, value) => {
      set(
        produce((state: BuilderState) => {
          const k = `children.${idx.stripeIndex}.children.${idx.structureIndex}.children.${idx.containerIndex}.${key}`;
          _Set(state.tree, k, value);
        })
      );
    },

    setBlockByKey: (idx, key, value) => {
      set(
        produce((state: BuilderState) => {
          const k = `children.${idx.stripeIndex}.children.${idx.structureIndex}.children.${idx.containerIndex}.children.${idx.blockIndex}.${key}`;
          _Set(state.tree, k, value);
        })
      );
    },

    /* ------------------------------------------------ Loader ------------------------------------------------ */
    init: ({ tree, meta, styles }) => {
      set({
        tree,
        styles,
        meta,
        hoverEle: undefined,
        screen: 'desktop',
        active: undefined,
        changeStack: [],
        isMouseInsideTree: false,
        selectedNode: undefined,
        editor: undefined,
        hasChanges: false,
      });
    },

    fetchImages: () => {
      const {
        tree,
        getContainerWidth,
        setBlockByKey,
        setStripeByKey,
        setStructureByKey,
        setContainerByKey,
        findBlockByType,
      } = get();
      const imagesBlockIdx = findBlockByType('image');
      imagesBlockIdx.forEach(async (idx) => {
        const stripe = tree.children[idx.stripeIndex];
        const structure = stripe.children[idx.structureIndex];
        const container = structure.children[idx.containerIndex];
        const block = container.children[idx.blockIndex] as BlockImage;
        try {
          const { width, height } = block.style;
          let metaData = block.data.image;
          if (metaData === undefined) metaData = await getImageMetaData(block.data.src);
          if (width.desktop === undefined && height.desktop === undefined) {
            const maxWidth = getContainerWidth(idx);
            const { widthValue } = getImageDimension(
              width.desktop,
              height.desktop,
              metaData.width,
              metaData.height,
              maxWidth
            );
            setBlockByKey(idx, 'style.width.desktop', widthValue);
            setBlockByKey(idx, 'data.sizeType', 'width');
          }
          if (width.mobile === undefined && height.mobile === undefined) {
            const availableWidth = getContainerWidth(idx);
            const { widthValue } = getImageDimension(
              width.mobile,
              height.mobile,
              metaData.width,
              metaData.height,
              availableWidth
            );
            setBlockByKey(idx, 'style.width.mobile', widthValue);
            setBlockByKey(idx, 'data.sizeType', 'width');
          }
          setBlockByKey(idx, 'data.image', metaData);
        } catch {
          toast.error('Provide a valid image URL');
        }
      });
      const stripes = tree.children;
      stripes.forEach(async (stripe, stripeIndex) => {
        // fetch image of stripe
        if (stripe.style.backgroundImage) {
          try {
            const metaData = await getImageMetaData(stripe.style.backgroundImage.src);
            setStripeByKey({ stripeIndex }, 'style.backgroundImage.metaData', metaData);
          } catch {
            toast.error('Provide a valid image URL');
          }
        }

        // iterate over structures to get the image
        const structures = stripe.children;
        structures.forEach(async (structure, structureIndex) => {
          if (structure.style.backgroundImage) {
            try {
              const metaData = await getImageMetaData(structure.style.backgroundImage.src);
              setStructureByKey(
                { stripeIndex, structureIndex },
                'style.backgroundImage.metaData',
                metaData
              );
            } catch {
              toast.error('Provide a valid image URL');
            }
          }

          structure.children.forEach(async (container, containerIndex) => {
            if (container.style.backgroundImage) {
              try {
                const metaData = await getImageMetaData(container.style.backgroundImage.src);
                setContainerByKey(
                  { stripeIndex, structureIndex, containerIndex },
                  'style.backgroundImage.metaData',
                  metaData
                );
              } catch {
                toast.error('Provide a valid image URL');
              }
            }
          });
        });
      });
    },

    /* ---------------------------------------------- Node Adder ---------------------------------------------- */
    addStripe: (idx, containerLayout) => {
      const { changeStructureLayout } = get();

      const newStripe = defaultStripe({ id: uuidv4() });
      const newStructure = defaultStructure({ id: uuidv4() });
      const layouts = parseLayouts(containerLayout);
      layouts.forEach(() => newStructure.children.push(defaultContainer({ id: uuidv4() })));
      newStripe.children.push(newStructure);

      set(
        produce((state: BuilderState) => {
          state.tree.children.splice(idx.stripeIndex, 0, newStripe);
        })
      );

      changeStructureLayout({ ...idx, structureIndex: 0 }, containerLayout);
    },

    addStructure: (idx, containerLayout) => {
      const { changeStructureLayout } = get();
      const newStructure = defaultStructure({ id: uuidv4() });
      const layouts = parseLayouts(containerLayout);
      layouts.forEach(() => newStructure.children.push(defaultContainer({ id: uuidv4() })));

      set(
        produce((state: BuilderState) => {
          const stripe = state.tree.children[idx.stripeIndex];
          stripe.children.splice(idx.structureIndex, 0, newStructure);
        })
      );

      changeStructureLayout(idx, containerLayout);
    },

    addContainer: (idx) => {
      set(
        produce((state: BuilderState) => {
          const structure = state.tree.children[idx.stripeIndex].children[idx.structureIndex];
          structure.children.splice(idx.containerIndex, 0, defaultContainer({ id: uuidv4() }));
        })
      );
    },

    addBlock: (idx, block) => {
      let newBlock: BlockTree;
      if (typeof block === 'string') newBlock = defaultBlock(uuidv4(), block);
      else newBlock = block;

      set(
        produce((state: BuilderState) => {
          const stripe = state.tree.children[idx.stripeIndex];
          const structure = stripe.children[idx.structureIndex];
          const container = structure.children[idx.containerIndex];

          if (nodeUtils.isContainerIndex(idx)) container.children.push(newBlock);

          if (nodeUtils.isBlockIndex(idx)) container.children.splice(idx.blockIndex, 0, newBlock);
        })
      );
    },

    /* ---------------------------------------------- Node Utils ---------------------------------------------- */
    addNode: (activeData, overData) => {
      const { addBlock, addContainer, addStructure } = get();
      const { idx: overIdx } = overData;
      if (overIdx === undefined) return;
      const { type } = activeData;

      if (type === 'structure' && nodeUtils.isStructureIndex(overIdx)) {
        const { layout } = activeData;
        addStructure(overIdx, layout || 'auto');
      }

      if (type === 'container' && nodeUtils.isContainerIndex(overIdx)) {
        addContainer(overIdx);
      }

      if (type === 'block' && nodeUtils.isContainerIndex(overIdx)) {
        addBlock(overIdx, activeData.blockType);
      }

      if (type === 'block' && nodeUtils.isBlockIndex(overIdx)) {
        addBlock(overIdx, activeData.blockType);
      }
    },

    deleteNode: (node) => {
      const { isNodeExist } = get();
      const { idx, type } = node;

      // This check for strict mode. If node is not found then return the same tree
      // because in dev mode setState called twice, and we can't relay on index to delete node
      if (isNodeExist(node.id) === false) return;

      set(
        produce((state: BuilderState) => {
          const stripe = state.tree.children[idx.stripeIndex];
          if (type === 'stripe') {
            state.tree.children.splice(idx.stripeIndex, 1);
            return;
          }

          const structure = stripe.children[idx.structureIndex];
          if (type === 'structure') {
            stripe.children.splice(idx.structureIndex, 1);
            return;
          }

          const container = structure.children[idx.containerIndex];
          if (type === 'container') {
            structure.children.splice(idx.containerIndex, 1);
            return;
          }

          if (type === 'block') container.children.splice(idx.blockIndex, 1);
        })
      );
    },

    selectNode: (node) => {
      set({ selectedNode: node });
    },

    selectNodeById: () => {
      // const { tree } = get();
      // const stripe = tree.children.find((s) => s.id === nodeId);
      // if (stripe) {
      //   set({
      //     selectedNode: {
      //       ...stripe,
      //       idx: { stripeIndex: tree.children.indexOf(stripe) },
      //     },
      //   });
      //   return;
      // }
      // const structure = tree.children.flatMap((s) => s.children).find((c) => c.id === nodeId);
      // if (structure) {
      //   set({
      //     selectedNode: {
      //       ...structure,
      //       idx: {
      //         stripeIndex: tree.children.indexOf(structure),
      //         structureIndex: tree.children.indexOf(structure),
      //       },
      //     },
      //   });
      //   return;
      // }
      // const container = tree.children
      //   .flatMap((s) => s.children)
      //   .flatMap((c) => c.children)
      //   .find((b) => b.id === nodeId);
      // if (container) {
      //   set({
      //     selectedNode: {
      //       ...container,
      //       idx: {
      //         stripeIndex: tree.children.indexOf(container),
      //         structureIndex: tree.children.indexOf(container),
      //         containerIndex: tree.children.indexOf(container),
      //       },
      //     },
      //   });
      //   return;
      // }
      // const block = tree.children
      //   .flatMap((s) => s.children)
      //   .flatMap((c) => c.children)
      //   .flatMap((b) => b.children)
      //   .find((b) => b.id === nodeId);
      // if (block) {
      //   set({
      //     selectedNode: {
      //       ...block,
      //       idx: {
      //         stripeIndex: tree.children.indexOf(block),
      //         structureIndex: tree.children.indexOf(block),
      //         containerIndex: tree.children.indexOf(block),
      //         blockIndex: tree.children.indexOf(block),
      //       },
      //     },
      //   });
      // }
    },

    cloneNode: (node) => {
      const { idx, type } = node;

      set(
        produce((state: BuilderState) => {
          const stripe = state.tree.children[idx.stripeIndex];
          if (type === 'stripe') {
            const clonedStripe = cloneDeep(stripe);
            nodeUtils.updateIds(clonedStripe);
            state.tree.children.splice(idx.stripeIndex + 1, 0, clonedStripe);
            return;
          }

          const structure = stripe.children[idx.structureIndex];
          if (type === 'structure') {
            const clonedStructure = cloneDeep(structure);
            nodeUtils.updateIds(clonedStructure);
            stripe.children.splice(idx.structureIndex, 0, clonedStructure);
            return;
          }

          const container = structure.children[idx.containerIndex];
          if (type === 'container') {
            const clonedContainer = cloneDeep(container);
            nodeUtils.updateIds(clonedContainer);
            structure.children.splice(idx.containerIndex, 0, clonedContainer);
            return;
          }

          const block = container.children[idx.blockIndex];
          const clonedBlock = cloneDeep(block);
          nodeUtils.updateIds(clonedBlock);
          container.children.splice(idx.blockIndex, 0, clonedBlock);
        })
      );
    },

    clearSelectedNode: () => {
      set({ selectedNode: undefined, editor: undefined });
    },

    getParent: () => {
      const { selectedNode, getParentNode } = get();
      return selectedNode && getParentNode(selectedNode.idx);
    },

    isNodeExist: (nodeId) => {
      const { tree } = get();
      const stripe = tree.children.find((s) => s.id === nodeId);
      if (stripe) return true;

      const structure = tree.children.flatMap((s) => s.children).find((c) => c.id === nodeId);
      if (structure) return true;

      const container = tree.children
        .flatMap((s) => s.children)
        .flatMap((c) => c.children)
        .find((b) => b.id === nodeId);
      if (container) return true;

      const block = tree.children
        .flatMap((s) => s.children)
        .flatMap((c) => c.children)
        .flatMap((b) => b.children)
        .find((b) => b.id === nodeId);

      if (block) return true;

      return false;
    },

    selectParent: () => {
      set(({ selectedNode, getParentNode }) => {
        const parent = selectedNode && getParentNode(selectedNode.idx);
        if (parent) return { selectedNode: parent };
        return { selectedNode: undefined };
      });
    },

    getParentStripeType: (node) => {
      const stripe = get().tree.children[node.idx.stripeIndex];
      return stripe.data.stripeType;
    },

    findBlockByType: (type) => {
      const { tree } = get();
      const blocks: BlockIndex[] = [];

      tree.children.forEach((strip, stripeIndex) => {
        strip.children.forEach((structure, structureIndex) => {
          structure.children.forEach((container, containerIndex) => {
            container.children.forEach((block, blockIndex) => {
              if (type === block.blockType || type.includes(block.blockType))
                blocks.push({
                  stripeIndex,
                  structureIndex,
                  containerIndex,
                  blockIndex,
                });
            });
          });
        });
      });

      return blocks;
    },

    moveNode: (activeData, overData) => {
      set(
        produce((state: BuilderState) => {
          if (activeData.type === 'stripe' && overData.type === 'drop-zone-stripe') {
            const activeIdx = activeData.idx;
            const overIdx = overData.idx;
            const [stripe] = state.tree.children.splice(activeIdx.stripeIndex, 1);
            // adjust the index after deleting the node
            if (overIdx.stripeIndex > activeIdx.stripeIndex) overIdx.stripeIndex -= 1;
            state.tree.children.splice(overIdx.stripeIndex, 0, stripe);
          }

          if (activeData.type === 'structure' && overData.type === 'drop-zone-structure') {
            const activeIdx = activeData.idx;
            const overIdx = overData.idx;
            const activeStripe = state.tree.children[activeIdx.stripeIndex];

            let movedStructure: StructureTree;

            // check if there is only on structure in stripe
            // then don't remove the structure from the stripe just clone it
            // and reset the original structure
            if (activeStripe.children.length === 1) {
              const activeStructure = activeStripe.children[activeIdx.structureIndex];
              movedStructure = cloneDeep(activeStructure);
              // TODO: check if this is correct
              // activeStructure.children.forEach((c) => {
              //   c.children = [];
              // });
              activeStructure.children = activeStructure.children.map((container) => ({
                ...container,
                children: [],
              }));
              movedStructure.id = uuidv4();
            } else {
              [movedStructure] = activeStripe.children.splice(activeIdx.structureIndex, 1);
            }

            // adjust the index after deleting the node if there are in same stripe
            if (
              overIdx.stripeIndex === activeIdx.stripeIndex &&
              overIdx.structureIndex > activeIdx.structureIndex
            ) {
              overIdx.structureIndex -= 1;
            }

            const overStripe = state.tree.children[overIdx.stripeIndex];
            overStripe.children.splice(overIdx.structureIndex, 0, movedStructure);
          }

          if (
            activeData.type === 'container' &&
            (overData.type === 'drop-zone-container' || overData.type === 'drop-zone-block')
          ) {
            const activeIdx = activeData.idx;
            const overIdx = overData.idx;

            const activeStripe = state.tree.children[activeIdx.stripeIndex];
            const activeStructure = activeStripe.children[activeIdx.structureIndex];
            const activeContainer = activeStructure.children[activeIdx.containerIndex];
            const allBlocks = activeContainer.children.splice(0, activeContainer.children.length);

            const overStripe = state.tree.children[overIdx.stripeIndex];
            const overStructure = overStripe.children[overIdx.structureIndex];
            const overContainer = overStructure.children[overIdx.containerIndex];

            if (overData.type === 'drop-zone-block')
              overContainer.children.splice(overData.idx.blockIndex, 0, ...allBlocks);
            else overContainer.children.push(...allBlocks);
          }

          if (
            activeData.type === 'block' &&
            (overData.type === 'drop-zone-container' || overData.type === 'drop-zone-block')
          ) {
            const activeIdx = activeData.idx;
            const overIdx = overData.idx;

            const activeStripe = state.tree.children[activeIdx.stripeIndex];
            const activeStructure = activeStripe.children[activeIdx.structureIndex];
            const activeContainer = activeStructure.children[activeIdx.containerIndex];
            // const activeBlock = activeContainer.children[activeIdx.blockIndex];
            const [block] = activeContainer.children.splice(activeIdx.blockIndex, 1);

            const overStripe = state.tree.children[overIdx.stripeIndex];
            const overStructure = overStripe.children[overIdx.structureIndex];
            const overContainer = overStructure.children[overIdx.containerIndex];

            if (overData.type === 'drop-zone-block') {
              // adjust index after deleting node
              if (
                overIdx.stripeIndex === activeIdx.stripeIndex &&
                overIdx.structureIndex === activeIdx.structureIndex &&
                overIdx.containerIndex === activeIdx.containerIndex &&
                overData.idx.blockIndex > activeIdx.blockIndex
              )
                overData.idx.blockIndex -= 1;

              overContainer.children.splice(overData.idx.blockIndex, 0, block);
              return;
            }

            overContainer.children.push(block);
          }
        })
      );
    },

    getParentNode: (idx) => {
      const { getNodeByIndex } = get();

      const { stripeIndex, structureIndex, containerIndex, blockIndex } = idx;

      if (blockIndex !== undefined)
        return getNodeByIndex({ stripeIndex, structureIndex, containerIndex });

      if (containerIndex !== undefined) return getNodeByIndex({ stripeIndex, structureIndex });

      return getNodeByIndex({ stripeIndex });
    },

    getNodeByIndex: (idx) => {
      const { tree } = get();
      const { stripeIndex, blockIndex, containerIndex, structureIndex } = idx;

      const stripe = tree.children[stripeIndex];
      if (structureIndex === undefined) return { ...stripe, idx };

      const structure = stripe.children[structureIndex];
      if (containerIndex === undefined)
        return { ...structure, idx: { stripeIndex, structureIndex } };

      const container = structure.children[containerIndex];
      if (blockIndex === undefined)
        return {
          ...container,
          idx: { stripeIndex, structureIndex, containerIndex },
        };

      const block = container.children[blockIndex];
      return {
        ...block,
        idx: { stripeIndex, structureIndex, containerIndex, blockIndex },
      };
    },

    /* ------------------------------------ Structure Container Width Utils ----------------------------------- */
    getContainerWidth: (blockIdx) => {
      const { tree, screen, styles, getNodeByIndex } = get();

      const { blockIndex, ...containerIndex } = blockIdx;

      const container = getNodeByIndex(containerIndex);

      if (container.type !== 'container') throw new Error(`Invalid block index ${blockIndex}`);

      if (screen === 'desktop') return container.style.width;

      const stripe = tree.children[containerIndex.stripeIndex];
      const stripeBorder = stripe.style.border;
      const structure = stripe.children[containerIndex.structureIndex];

      // const stripePadding = stripe.style.padding.mobile;
      const structurePadding =
        structure.style.padding?.mobile || styles.general.structurePadding.mobile;

      return (
        DEFAULT_MOBILE_WIDTH -
        // (stripePadding?.[3] || 0) -
        // (stripePadding?.[1] || 0) -
        structurePadding[3] -
        structurePadding[1] -
        (stripeBorder?.width[3] || 0) -
        (stripeBorder?.width[1] || 0)
      );
    },

    getStructureAvailableWidth: (idx) => {
      const { tree, styles } = get();
      const stripe = tree.children[idx.stripeIndex];
      const structure = stripe.children[idx.structureIndex];
      const padding = structure.style.padding?.desktop || styles.general.structurePadding.desktop;
      const stripeBorder =
        (stripe.style.border?.width[1] || 0) + (stripe.style.border?.width[3] || 0);
      const stripeWidth = styles.general.width;
      const [, right, , left] = padding;
      const { gap } = structure.style;
      const containerCount = structure.children.length;
      const totalGaps = (containerCount - 1) * (gap?.desktop || 0);

      return stripeWidth - stripeBorder - left - right - totalGaps;
    },

    updateStructureContainerWidths: (idx, newWidth) => {
      set(
        produce((state: BuilderState) => {
          const structure = state.tree.children[idx.stripeIndex].children[idx.structureIndex];

          if (structure.children.length !== newWidth.length) throw new Error('Invalid width array');

          structure.children.forEach((c, i) => {
            if (c.style.width === newWidth[i]) return;

            c.style.width = newWidth[i];
          });
        })
      );
    },

    changeStructureLayout: (idx, newLayout) => {
      const { tree, getStructureAvailableWidth, updateStructureContainerWidths } = get();

      const stripe = tree.children[idx.stripeIndex];
      const structure = stripe.children[idx.structureIndex];
      const availableWidth = getStructureAvailableWidth(idx);
      const containerCount = structure.children.length;

      const newContainerWidths = distributeValue(
        availableWidth,
        newLayout.includes(':') ? newLayout : containerCount
      );

      updateStructureContainerWidths(idx, newContainerWidths);
    },

    adjustStructureContainerWidth: (idx, updatedContainerWidth, updatedContainerIndex) => {
      const { tree, getStructureAvailableWidth, updateStructureContainerWidths } = get();

      const stripe = tree.children[idx.stripeIndex];
      const structure = stripe.children[idx.structureIndex];
      const availableWidth = getStructureAvailableWidth(idx);
      const newContainerWidths = adjustContainerWidth({
        availableWidth,
        structure,
        updatedContainerWidth,
        updatedContainerIndex,
      });

      updateStructureContainerWidths(idx, newContainerWidths);
    },

    /* ------------------------------------------- Drag & Drop Utils ------------------------------------------ */
    onDragCancel: () => {
      set({ active: undefined });
    },

    onDragEnd: (event) => {
      const { active, over } = event;
      if (!over) {
        set({ active: undefined });
        return;
      }

      const activeData = nodeUtils.getNodeDragData(active);
      const overData = nodeUtils.getNodeOverData(over);
      const { idx: activeIdx } = activeData;
      const { addNode, moveNode } = get();

      if (activeIdx === undefined) addNode(activeData, overData);

      if (activeIdx) moveNode(activeData, overData);

      set({ active: undefined });
    },

    onDragStart: (event) => {
      const activeData = nodeUtils.getNodeDragData(event.active);
      set({ active: activeData });
    },

    collisionDetectionStrategy: (args) => {
      const { frameRef } = get();

      if (!frameRef) {
        throw new Error('Frame ref is not set');
      }

      if (!isMouseInFrame(frameRef, args.pointerCoordinates)) {
        return rectIntersection(args);
      }
      const activeData = nodeUtils.getNodeDragData(args.active);
      if (activeData.type === 'block') {
        const dropZones = args.droppableContainers.filter((c) => {
          const data = nodeUtils.getNodeOverData(c);
          // return (
          //   data.idx && (nodeUtils.isContainerIndex(data.idx) || nodeUtils.isBlockIndex(data.idx))
          // );
          return data.type === 'drop-zone-container' || data.type === 'drop-zone-block';
        });
        // const withInPointer = pointerWithin({ ...args, droppableContainers: dropContainers });
        // if (withInPointer.length > 0) return withInPointer;
        return myClosestCorners({ ...args, droppableContainers: dropZones });
        // return rectIntersection({ ...args, droppableContainers: dropContainers });
        // return pointerWithin({ ...args, droppableContainers: dropContainers });
        // return closestCorners({ ...args, droppableContainers: dropContainers });
      }
      if (activeData.type === 'stripe') {
        const dropZones = args.droppableContainers.filter((c) => {
          const data = nodeUtils.getNodeOverData(c);
          return data.type === 'drop-zone-stripe';
        });
        return closestCenter({ ...args, droppableContainers: dropZones });
      }
      if (activeData.type === 'structure') {
        const dropZones = args.droppableContainers.filter((c) => {
          const data = nodeUtils.getNodeOverData(c);
          return data.type === 'drop-zone-structure';
        });
        return closestCenter({ ...args, droppableContainers: dropZones });
      }
      if (activeData.type === 'container') {
        const dropZones = args.droppableContainers.filter((c) => {
          const data = nodeUtils.getNodeOverData(c);
          return data.type === 'drop-zone-container' || data.type === 'drop-zone-block';
        });
        return myClosestCorners({ ...args, droppableContainers: dropZones });
      }
      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter((container) => container),
      });
    },

    /* ----------------------------------------------- Converter ---------------------------------------------- */
    getAsHtml: () => {
      const { tree, styles, meta } = get();
      const html = HTMLTreeConverter(styles, tree, meta);

      // here we inline css in html
      // https://vmail.leopard.in.ua/
      return inline(html).replaceAll('data-css-inline="keep"', '');
    },

    getAsText: () => {
      const { tree, styles } = get();
      const { html } = BodyTreeConverter({ tree, styles });
      const divContainer = document.createElement('div');

      divContainer.innerHTML = ReactDOMServer.renderToStaticMarkup(html);

      return divContainer.innerText.replaceAll('\n', ' ');
    },

    getAsCode: () => {
      const { tree, styles, meta } = get();

      const code = `
        import type { Tree } from "../nodes/tree/type";
        import type { Styles } from "../styles/type";
        import type { Meta } from "../types";
  
        const styles: Styles =  ${jsonToStringWithUndefined(styles)};
  
        const tree: Tree = ${jsonToStringWithUndefined(tree)};
  
        const meta: Meta = ${jsonToStringWithUndefined(meta)};
  
        export { tree, meta, styles };
      `;

      return code;
    },

    getAsParams: () => {
      const { tree, styles, meta } = get();
      return { tree, styles, meta };
    },

    getAsImage: async (type: Screen, filename?: string) => {
      const { tree, styles, meta } = get();
      const html = HTMLTreeConverter(styles, tree, meta);

      try {
        const image = await emailTemplateThumbnail(type, html);
        const link = document.createElement('a');
        link.href = image;
        link.download = filename || 'screenshot.png';
        link.click();
      } catch (error) {
        console.error('Error capturing the iframe:', error);
      }
    },

    /* ---------------------------------------------- Other Utils --------------------------------------------- */
    onGeneralDirChange: (dir) => {
      set(
        produce<BuilderState>((state) => {
          const textBlockIndex = state.findBlockByType('text');
          textBlockIndex.forEach((idx) => {
            const b =
              state.tree.children[idx.stripeIndex].children[idx.structureIndex].children[
                idx.containerIndex
              ].children[idx.blockIndex];
            if (b.blockType === 'text') {
              if (b.style.textAlignment) {
                b.style.textAlignment.desktop = dir === 'rtl' ? 'right' : 'left';
              }
            }
          });
          state.styles.general.rtl = dir === 'rtl';
        })
      );
    },

    addChange: (command) => {
      set((state) => ({
        changeStack: [...state.changeStack, { command, tree: state.tree }],
      }));
    },
  };
};

export const useBuilderStore = create<BuilderState>()(subscribeWithSelector(builderStore));
