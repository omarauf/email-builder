import { Terminal } from 'lucide-react';
import type { Visibility } from '@/types';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block, blockStyle } from './block';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

interface Props {
  value?: Visibility;
  onChange: (v: Visibility) => void;
}

export function Hide({ value, onChange }: Props) {
  const screen = useBuilderStore((s) => s.screen);

  const otherScreen = screen === 'mobile' ? 'desktop' : 'mobile';

  const isOtherHidden = value?.[otherScreen] === true;

  // make this function to change the value of the visibility
  // both mobile and desktop cannot be true at the same time
  // if mobile is true then desktop should be false and vice versa
  // both values should can be false
  const handleChange = (v: boolean) => {
    const updatedValue = value === undefined ? { mobile: false, desktop: false } : { ...value };

    if (screen === 'mobile') {
      updatedValue.mobile = v;
      if (v) updatedValue.desktop = false; // If mobile is true, desktop must be false
    } else if (screen === 'desktop') {
      updatedValue.desktop = v;
      if (v) updatedValue.mobile = false; // If desktop is true, mobile must be false
    }

    onChange(updatedValue);
  };

  return (
    <>
      {isOtherHidden && (
        <div className={cn(blockStyle.px, blockStyle.py)}>
          <Alert variant="default">
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Block badge title={`Hide ${screen}`} className={cn(isOtherHidden && 'pt-0')}>
        <Switch checked={value?.[screen] || false} onCheckedChange={handleChange} />
      </Block>
    </>
  );
}
