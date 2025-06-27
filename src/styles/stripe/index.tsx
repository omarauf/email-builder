import { useShallow } from 'zustand/react/shallow';
import type { StripeType } from '@/nodes/stripe/type';
import { Switch } from '@/components/ui/switch';
import { XTabs } from '@/components/x-common/tabs';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { DEFAULT_STRIP_BOTTOM_SPACE } from './blueprint';

export function StripesSetting() {
  const [styles, screen, setGlobalStyleByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey])
  );
  const { stripe } = styles;

  const TABS = [
    { label: 'Header', content: <StripeSetting type="header" /> },
    { label: 'Content', content: <StripeSetting type="content" /> },
    { label: 'Footer', content: <StripeSetting type="footer" /> },
    { label: 'Info Area', content: <StripeSetting type="infoArea" /> },
  ];

  return (
    <div>
      <StyleComponent.FontFamily
        value={stripe.fontFamily}
        onChange={(c) => setGlobalStyleByKey('stripe.fontFamily', c)}
      />

      <Separator />

      <StyleComponent.LineHeight
        badge
        title={`Line Height on ${screen}`}
        value={stripe.lineHeight[screen]}
        onChange={(v) => setGlobalStyleByKey(`stripe.lineHeight.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.LetterSpacing
        unit={stripe.letterSpacing.unit}
        value={stripe.letterSpacing.value}
        onValueChange={(v) => setGlobalStyleByKey('stripe.letterSpacing.value', v)}
        onUnitChange={(v) => setGlobalStyleByKey('stripe.letterSpacing.unit', v)}
      />

      <Separator />

      <XTabs tabs={TABS} defaultTab="Header" className="h-12 rounded-none border-b py-1.5" />
    </div>
  );
}

function StripeSetting({ type }: { type: StripeType }) {
  const [styles, screen, setGlobalStyleByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey])
  );
  const { stripe } = styles;

  return (
    <div>
      <StyleComponent.Color
        title="Stripe Background Color"
        value={stripe[type].stripeBackgroundColor || 'transparent'}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.stripeBackgroundColor`, c)}
      />

      <Separator />

      <StyleComponent.FontSize
        badge
        title={`Font Size on ${screen}`}
        value={stripe[type].fontSize[screen]}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.fontSize.${screen}`, c)}
      />

      <Separator />

      <StyleComponent.Color
        title="Content Background Color"
        value={stripe[type].contentBackgroundColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.contentBackgroundColor`, c)}
      />

      <Separator />

      <StyleComponent.Color
        title="Font Color"
        value={stripe[type].fontColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.fontColor`, c)}
      />

      <Separator />

      <StyleComponent.Color
        title="Link Color"
        value={stripe[type].linkColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.linkColor`, c)}
      />

      <Separator />

      <StyleComponent.Color
        title="Link Hover Color"
        value={stripe[type].linkHoverColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.linkHoverColor`, c)}
      />

      <Separator />

      <StyleComponent.Block title="Paragraph Bottom Space">
        <Switch
          checked={stripe[type].bottomSpace !== undefined}
          onCheckedChange={(v) => {
            const defaultValue = DEFAULT_STRIP_BOTTOM_SPACE;

            setGlobalStyleByKey(
              `stripe.${type}.bottomSpace`,
              v ? { desktop: defaultValue, mobile: defaultValue } : undefined
            );
          }}
        />
      </StyleComponent.Block>

      {stripe[type].bottomSpace && (
        <StyleComponent.BottomSpace
          badge
          title={`Bottom Space on ${screen}`}
          subTitle="The bottom space will be applied to all text paragraphs"
          value={stripe[type].bottomSpace[screen]}
          onChange={(v) => setGlobalStyleByKey(`stripe.${type}.bottomSpace.${screen}`, v)}
          className="pt-0"
        />
      )}
    </div>
  );
}
