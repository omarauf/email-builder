import { useShallow } from 'zustand/react/shallow';
import type { HeadingType } from '@/nodes/block-text/type';
import { Switch } from '@/components/ui/switch';
import { XTabs } from '@/components/x-common/tabs';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { DEFAULT_HEADING_BOTTOM_SPACE } from './blueprint';

const TABS = [
  { label: 'h1', content: <HeadingSetting type="h1" /> },
  { label: 'h2', content: <HeadingSetting type="h2" /> },
  { label: 'h3', content: <HeadingSetting type="h3" /> },
  { label: 'h4', content: <HeadingSetting type="h4" /> },
  { label: 'h5', content: <HeadingSetting type="h5" /> },
  { label: 'h6', content: <HeadingSetting type="h6" /> },
];

export function HeadingsSetting() {
  const [styles, setGlobalStyleByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.setGlobalStyleByKey])
  );
  const { heading } = styles;

  return (
    <div>
      <StyleComponent.FontFamily
        value={heading.fontFamily}
        onChange={(c) => setGlobalStyleByKey(`heading.fontFamily`, c)}
      />

      <Separator />

      <StyleComponent.LetterSpacing
        unit={heading.letterSpacing.unit}
        value={heading.letterSpacing.value}
        onValueChange={(v) => setGlobalStyleByKey('heading.letterSpacing.value', v)}
        onUnitChange={(v) => setGlobalStyleByKey('heading.letterSpacing.unit', v)}
      />

      <Separator />

      <StyleComponent.Block title="Paragraph Bottom Space">
        <Switch
          checked={heading.bottomSpaceEnabled}
          onCheckedChange={(v) => {
            if (v)
              (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).forEach((type) => {
                const defaultValue = DEFAULT_HEADING_BOTTOM_SPACE[type];
                setGlobalStyleByKey(`heading.${type}.bottomSpace.desktop`, defaultValue.desktop);
                setGlobalStyleByKey(`heading.${type}.bottomSpace.mobile`, defaultValue.mobile);
              });

            setGlobalStyleByKey(`heading.bottomSpaceEnabled`, v);
          }}
        />
      </StyleComponent.Block>

      <Separator />

      <XTabs tabs={TABS} defaultTab="h1" className="h-12 rounded-none py-1.5" />
    </div>
  );
}

function HeadingSetting({ type }: { type: HeadingType }) {
  const [styles, screen, setGlobalStyleByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey])
  );
  const { heading } = styles;

  return (
    <div>
      <StyleComponent.FontSize
        badge
        title={`Font Size on ${screen}`}
        value={heading[type].fontSize[screen]}
        onChange={(v) => setGlobalStyleByKey(`heading.${type}.fontSize.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.TextAlignment
        title={`Text Alignment on ${screen}`}
        value={heading[type].textAlignment[screen] || 'left'}
        onChange={(v) => setGlobalStyleByKey(`heading.${type}.textAlignment.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.LineHeight
        badge
        title={`Line Height on ${screen}`}
        value={heading[type].lineHeight[screen]}
        onChange={(v) => setGlobalStyleByKey(`heading.${type}.lineHeight.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.Color
        title="Font Color"
        value={heading[type].fontColor}
        onChange={(c) => setGlobalStyleByKey(`heading.${type}.fontColor`, c)}
      />

      <Separator />

      <StyleComponent.TextStyles
        value={heading[type].textStyles}
        onChange={(v) => setGlobalStyleByKey(`heading.${type}.textStyles`, v)}
      />

      {heading.bottomSpaceEnabled && (
        <>
          <Separator />

          <StyleComponent.BottomSpace
            badge
            title={`Bottom Space on ${screen}`}
            subTitle="The bottom space will be applied to all text paragraphs"
            value={heading[type].bottomSpace[screen] || 0}
            onChange={(v) => setGlobalStyleByKey(`heading.${type}.bottomSpace.${screen}`, v)}
          />
        </>
      )}
    </div>
  );
}
