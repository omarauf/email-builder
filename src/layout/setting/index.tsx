import { useMemo, useState } from 'react';
import { GeneralSetting } from '@/styles/general';
import { StripesSetting } from '@/styles/stripe';
import { HeadingsSetting } from '@/styles/heading';
import { ButtonsSetting } from '@/styles/button';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { XTabs } from '@/components/tabs';
import { CustomAccordion } from '@/components/accordion';
import { StackingCards } from '@/components/card/stacking-cards';
import { NodeSetting } from './node-setting';
import { TreeView } from './element-tree';
import { Message } from './message';

export function EmailSetting() {
  const selectedNode = useBuilderStore((s) => s.selectedNode);
  const [expanded, setExpanded] = useState(-1);

  const handleChange = (panel: number) => (_: React.SyntheticEvent, newExpanded: boolean) =>
    setExpanded(newExpanded ? panel : -1);

  const accordions = useMemo(
    () => [
      { title: 'General Settings', content: <GeneralSetting /> },
      { title: 'Stripes', content: <StripesSetting /> },
      { title: 'Headings', content: <HeadingsSetting /> },
      { title: 'Buttons', content: <ButtonsSetting /> },
    ],
    []
  );

  const SETTING_TABS = useMemo(
    () => [
      {
        icon: 'ic:baseline-email',
        content: <Message />,
      },
      {
        icon: 'solar:pallete-2-bold-duotone',
        content: (
          <StackingCards
            cards={[
              { title: 'General Settings', content: <GeneralSetting /> },
              { title: 'Stripes', content: <StripesSetting /> },
              { title: 'Headings', content: <HeadingsSetting /> },
              { title: 'Buttons', content: <ButtonsSetting /> },
            ]}
          />
        ),
      },
      // {
      //   icon: 'solar:pallete-2-bold-duotone',
      //   content: (
      //     <>
      //       {accordions.map((accordion, index) => (
      //         <CustomAccordion
      //           key={index}
      //           expanded={expanded}
      //           title={accordion.title}
      //           index={index}
      //           onChange={handleChange(index)}>
      //           {accordion.content}
      //         </CustomAccordion>
      //       ))}
      //     </>
      //   ),
      // },
      {
        icon: 'ph:tree-view-fill',
        content: <TreeView />,
      },
    ],
    []
  );

  if (selectedNode !== undefined) return <NodeSetting selectedNode={selectedNode} />;

  return (
    <XTabs
      tabs={SETTING_TABS}
      defaultTab={1}
      styleType="custom"
      variant="fullWidth"
      slotProps={{
        wrapper: {
          display: 'grid',
          gridTemplateRows: 'auto minmax(0, 1fr)',
          gap: 1.5,
          maxHeight: 1,
        },
      }}
    />
  );
}
