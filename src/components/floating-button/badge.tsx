import { m, AnimatePresence } from 'framer-motion';
import { Box, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
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
          <Box
            className="floating-button"
            sx={{
              position: 'absolute',
              clipPath: 'polygon(0 0,30% 100%,0 100%)',
              transform: 'translateY(-100%)',
              width: '100%',
              top: 0,
              left: elementRef.current?.getBoundingClientRect().width || 0,
              height: elementRef.current?.getBoundingClientRect().height || 50,
              //   bgcolor: "green",
              zIndex: 100,
            }}
          />
          <Box
            component={m.div}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="floating-button"
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              zIndex: 100,
              pb: 0.5,
              //   bgcolor: "red",
              top: 0,
              left: 0,
              transform: 'translateY(-100%)',
            }}>
            <Stack
              ref={elementRef}
              direction="row"
              bgcolor="rgb(102, 102, 102)"
              borderRadius="15px"
              sx={{
                py: 0.5,
                px: 1.5,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                zIndex: 100,
              }}>
              <Typography color="white" variant="caption" fontSize="10px">
                {title}
              </Typography>
            </Stack>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
}
