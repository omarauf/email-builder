import { useShallow } from 'zustand/react/shallow';
import { Switch } from '@/components/ui/switch';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function ButtonsSetting() {
  const [styles, setGlobalStyleByKey, screen] = useBuilderStore(
    useShallow((s) => [s.styles, s.setGlobalStyleByKey, s.screen])
  );

  const { button } = styles;

  return (
    <div>
      <StyleComponent.FontFamily
        value={button.fontFamily}
        onChange={(v) => setGlobalStyleByKey(`button.fontFamily`, v)}
      />

      <Separator />

      <StyleComponent.FontSize
        badge
        value={button.fontSize[screen]}
        onChange={(v) => setGlobalStyleByKey(`button.fontSize.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.Color
        title="Font Color"
        value={button.fontColor}
        onChange={(c) => setGlobalStyleByKey('button.fontColor', c)}
      />

      <Separator />

      <StyleComponent.TextStyles
        value={button.textStyles}
        onChange={(v) => setGlobalStyleByKey(`button.textStyles`, v)}
      />

      <Separator />

      <StyleComponent.LetterSpacing
        unit={button.letterSpacing.unit}
        value={button.letterSpacing.value}
        onValueChange={(v) => setGlobalStyleByKey('button.letterSpacing.value', v)}
        onUnitChange={(v) => setGlobalStyleByKey('button.letterSpacing.unit', v)}
      />

      <Separator />

      <StyleComponent.Color
        title="Button Color"
        value={button.buttonColor}
        onChange={(c) => setGlobalStyleByKey('button.buttonColor', c)}
      />

      <Separator />

      <StyleComponent.Border
        value={button.border}
        onChange={(value) => setGlobalStyleByKey(`button.border`, value)}
      />

      <Separator />

      <StyleComponent.ButtonHover
        value={{
          buttonColor: button.hover.buttonColor || button.buttonColor,
          fontColor: button.hover.fontColor || button.fontColor,
          borderColor: button.hover.borderColor || button.border?.color || 'transparent',
        }}
        onChange={(k, v) => setGlobalStyleByKey(`button.hover.${k}`, v)}
      />

      <Separator />

      <StyleComponent.BorderRadius
        value={button.borderRadius}
        onChange={(v) => setGlobalStyleByKey('button.borderRadius', v)}
      />

      <Separator />

      <StyleComponent.Block title={`Fit on ${screen}`} badge>
        <Switch
          checked={button.fullWidth[screen]}
          onCheckedChange={(v) => setGlobalStyleByKey(`button.fullWidth.${screen}`, v)}
        />
      </StyleComponent.Block>

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title="Padding"
        value={button.padding[screen]}
        onChange={(v) => setGlobalStyleByKey(`button.padding.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.Block title={`Fit on ${screen}`} badge>
        <Switch
          checked={button.fullWidth[screen]}
          onCheckedChange={(v) => setGlobalStyleByKey(`button.fullWidth.${screen}`, v)}
        />
      </StyleComponent.Block>
    </div>
  );
}
