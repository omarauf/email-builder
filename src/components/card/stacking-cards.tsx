import { Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import { SettingCard } from './setting-card';

interface Props {
  cards: { title: string; content: React.ReactNode }[];
}

export function StackingCards({ cards }: Props) {
  const [selected, setSelected] = useState(0);
  const [isUpHover, setIsUpHover] = useState(false);
  const [isDownHover, setIsDownHover] = useState(false);

  const downHoverHandler = useCallback(() => setIsDownHover(true), []);

  const upHoverHandler = useCallback(() => setIsUpHover(true), []);

  const reset = useCallback(() => {
    setIsDownHover(false);
    setIsUpHover(false);
  }, []);

  const onSelectHandler = useCallback((index: number) => {
    setSelected(index);
    setIsDownHover(false);
    setIsUpHover(false);
  }, []);

  const gridTemplateRows = `${'auto '.repeat(selected)}minmax(0, auto)`;

  return (
    <Stack display="grid" gridTemplateRows={gridTemplateRows} maxHeight={1} gridAutoRows="auto">
      {cards.map((card, index) => {
        const isDown = index > selected;
        const isUp = index < selected;
        const mx = `${Math.abs(selected - index) * 10}px`;
        const zIndex = 10 - Math.abs(selected - index);
        const mb = isUpHover && isUp ? '-6px' : isUp ? '-38px' : 0;
        const mt = isDownHover && isDown ? '-6px' : isDown ? '-38px' : 0;
        const height = index === selected ? '100%' : '50px';
        const br =
          isDownHover && isDown ? '0 0 16px 16px' : isUpHover && isUp ? '16px 16px 0 0' : '';

        return (
          <SettingCard
            key={card.title}
            title={card.title}
            onClick={() => onSelectHandler(index)}
            sx={{ mx, mb, mt, zIndex, height, borderRadius: br }}
            {...(isDown && {
              onMouseEnter: downHoverHandler,
              onMouseLeave: reset,
            })}
            {...(isUp && {
              onMouseEnter: upHoverHandler,
              onMouseLeave: reset,
            })}>
            {selected === index && card.content}
          </SettingCard>
        );
      })}
    </Stack>
  );
}
