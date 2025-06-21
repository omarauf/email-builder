import { Box, Divider } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
import { StyleComponent } from '@/components/styles';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function ButtonsSetting() {
  const [styles, setGlobalStyleByKey, screen] = useBuilderStore(
    useShallow((s) => [s.styles, s.setGlobalStyleByKey, s.screen])
  );

  const { button } = styles;

  return (
    <Box>
      <StyleComponent.FontFamily
        value={button.fontFamily}
        onChange={(v) => setGlobalStyleByKey(`button.fontFamily`, v)}
      />

      <Divider />

      <StyleComponent.FontSize
        badge
        value={button.fontSize[screen]}
        onChange={(v) => setGlobalStyleByKey(`button.fontSize.${screen}`, v)}
      />

      <Divider />

      <StyleComponent.Color
        title="Font Color"
        value={button.fontColor}
        onChange={(c) => setGlobalStyleByKey('button.fontColor', c)}
      />

      <Divider />

      <StyleComponent.TextStyles
        value={button.textStyles}
        onChange={(v) => setGlobalStyleByKey(`button.textStyles`, v)}
      />

      <Divider />

      <StyleComponent.LetterSpacing
        unit={button.letterSpacing.unit}
        value={button.letterSpacing.value}
        onValueChange={(v) => setGlobalStyleByKey('button.letterSpacing.value', v)}
        onUnitChange={(v) => setGlobalStyleByKey('button.letterSpacing.unit', v)}
      />

      <Divider />

      <StyleComponent.Color
        title="Button Color"
        value={button.buttonColor}
        onChange={(c) => setGlobalStyleByKey('button.buttonColor', c)}
      />

      <Divider />

      <StyleComponent.Border
        value={button.border}
        onChange={(value) => setGlobalStyleByKey(`button.border`, value)}
      />

      <Divider />

      <StyleComponent.ButtonHover
        value={{
          buttonColor: button.hover.buttonColor || button.buttonColor,
          fontColor: button.hover.fontColor || button.fontColor,
          borderColor: button.hover.borderColor || button.border?.color || 'transparent',
        }}
        onChange={(k, v) => setGlobalStyleByKey(`button.hover.${k}`, v)}
      />

      <Divider />

      <StyleComponent.BorderRadius
        value={button.borderRadius}
        onChange={(v) => setGlobalStyleByKey('button.borderRadius', v)}
      />

      <Divider />

      <StyleComponent.Block title={`Fit on ${screen}`} badge>
        <XField.Switch
          value={button.fullWidth[screen]}
          onChange={(v) => setGlobalStyleByKey(`button.fullWidth.${screen}`, v)}
        />
      </StyleComponent.Block>

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title="Padding"
        value={button.padding[screen]}
        onChange={(v) => setGlobalStyleByKey(`button.padding.${screen}`, v)}
      />
    </Box>
  );
}
