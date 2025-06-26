import { useMemo } from 'react';
import { StripesSetting } from '@/styles/stripe';
import { ButtonsSetting } from '@/styles/button';
import { GeneralSetting } from '@/styles/general';
import { HeadingsSetting } from '@/styles/heading';
import { XTabs } from '@/components/x-common/tabs';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { StackingCards } from '@/components/card/stacking-cards';
import { Message } from './message';
import { TreeView } from './element-tree';
import { NodeSetting } from './node-setting';

export function EmailSetting() {
  const selectedNode = useBuilderStore((s) => s.selectedNode);

  const SETTING_TABS = useMemo(
    () => [
      {
        icon: 'ic:baseline-email',
        label: 'Message',
        content: <Message />,
      },
      {
        icon: 'solar:pallete-2-bold-duotone',
        label: 'Styles',
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
        label: 'Element Tree',
        content: <TreeView />,
      },
    ],
    []
  );

  if (selectedNode !== undefined) return <NodeSetting selectedNode={selectedNode} />;

  return (
    <XTabs
      tabs={SETTING_TABS}
      defaultTab="Styles"
      className="h-12"
      containerClassName="grid grid-rows-[auto_minmax(0,_1fr)] gap-1.5 max-h-full"
    />
  );
}
