import { Box, Divider } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { StyleComponent } from '@/components/styles';
import type { StripeType } from '@/nodes/stripe/type';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { XTabs } from '@/components/tabs';
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
    <Box>
      <StyleComponent.FontFamily
        value={stripe.fontFamily}
        onChange={(c) => setGlobalStyleByKey('stripe.fontFamily', c)}
      />

      <Divider />

      <StyleComponent.LineHeight
        badge
        title={`Line Height on ${screen}`}
        value={stripe.lineHeight[screen]}
        onChange={(v) => setGlobalStyleByKey(`stripe.lineHeight.${screen}`, v)}
      />

      <Divider />

      <StyleComponent.LetterSpacing
        unit={stripe.letterSpacing.unit}
        value={stripe.letterSpacing.value}
        onValueChange={(v) => setGlobalStyleByKey('stripe.letterSpacing.value', v)}
        onUnitChange={(v) => setGlobalStyleByKey('stripe.letterSpacing.unit', v)}
      />

      <Divider />

      <XTabs tabs={TABS} styleType="custom" variant="fullWidth" />
    </Box>
  );
}

function StripeSetting({ type }: { type: StripeType }) {
  const [styles, screen, setGlobalStyleByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey])
  );
  const { stripe } = styles;

  return (
    <Box>
      <StyleComponent.Color
        title="Stripe Background Color"
        value={stripe[type].stripeBackgroundColor || 'transparent'}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.stripeBackgroundColor`, c)}
      />

      <Divider />

      <StyleComponent.FontSize
        badge
        title={`Font Size on ${screen}`}
        value={stripe[type].fontSize[screen]}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.fontSize.${screen}`, c)}
      />

      <Divider />

      <StyleComponent.Color
        title="Content Background Color"
        value={stripe[type].contentBackgroundColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.contentBackgroundColor`, c)}
      />

      <Divider />

      <StyleComponent.Color
        title="Font Color"
        value={stripe[type].fontColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.fontColor`, c)}
      />

      <Divider />

      <StyleComponent.Color
        title="Link Color"
        value={stripe[type].linkColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.linkColor`, c)}
      />

      <Divider />

      <StyleComponent.Color
        title="Link Hover Color"
        value={stripe[type].linkHoverColor}
        onChange={(c) => setGlobalStyleByKey(`stripe.${type}.linkHoverColor`, c)}
      />

      <Divider />

      <StyleComponent.Block title="Paragraph Bottom Space">
        <XField.Switch
          value={stripe[type].bottomSpace !== undefined}
          onChange={(v) => {
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
          sx={{ pt: 0 }}
        />
      )}
    </Box>
  );
}
