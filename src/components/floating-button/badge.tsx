import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Node } from '@/types';

interface Props {
  node: Node;
  visibilityCondition: boolean;
}

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export function Badge({ node, visibilityCondition }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { type } = node;

  let title: string = type;

  if (type === 'stripe') title += `: ${node.data.stripeType}`;
  if (type === 'block') title = `${node.blockType} block`;

  return (
    <AnimatePresence>
      {visibilityCondition && (
        <>
          <div
            className="floating-button"
            style={{
              position: 'absolute',
              clipPath: 'polygon(0 0,30% 100%,0 100%)',
              transform: 'translateY(-100%)',
              width: '100%',
              top: 0,
              left: elementRef.current?.getBoundingClientRect().width || 0,
              height: elementRef.current?.getBoundingClientRect().height || 50,
              zIndex: 100,
            }}
          />
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="floating-button"
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              zIndex: 100,
              paddingBottom: 4,
              top: 0,
              left: 0,
              transform: 'translateY(-100%)',
            }}>
            <div
              ref={elementRef}
              className="flex rounded-xl px-3 py-1"
              style={{
                backgroundColor: 'rgb(102, 102, 102)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                zIndex: 100,
              }}>
              <p className="text-[10px] text-white">{title}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
