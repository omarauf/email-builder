import type { JSX } from 'react';
import { cn } from '@/lib/utils';
import { Iconify } from '../iconify';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';

interface Props {
  tabs: {
    content: string | JSX.Element;
    label: string;
    className?: string;
    contentClassName?: string;
    icon?: string;
    disabled?: boolean;
  }[];
  defaultTab?: string;
  className?: string;
  containerClassName?: string;
}

export function XTabs({ tabs, className, defaultTab, containerClassName }: Props) {
  return (
    <Tabs defaultValue={defaultTab} className={containerClassName}>
      <TabsList className={cn('w-full', className)}>
        {tabs.map((t) => (
          <TabsTrigger
            key={t.label}
            value={t.label}
            className={cn('cursor-pointer', t.className)}
            disabled={t.disabled}>
            {t.icon && <Iconify icon={t.icon} width={24} />}
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label} className={tab.contentClassName}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
