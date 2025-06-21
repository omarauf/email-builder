import { Box, Divider } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
import { StyleComponent } from '@/components/styles';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function GeneralSetting() {
  const [styles, screen, setGlobalStyleByKey, onGeneralDirChange] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey, s.onGeneralDirChange])
  );
  const { general } = styles;

  return (
    <Box>
      <StyleComponent.Color
        title="General Background Color"
        value={general.backgroundColor}
        onChange={(c) => setGlobalStyleByKey('general.backgroundColor', c)}
      />

      <Divider />

      {screen === 'desktop' && (
        <>
          <StyleComponent.Block title="Message Content Width">
            <XField.Number
              size="small"
              value={general.width}
              onChange={(v) => setGlobalStyleByKey('general.width', v)}
              sx={{ width: 120 }}
              min={320}
              max={900}
            />
          </StyleComponent.Block>

          <Divider />

          <StyleComponent.Alignment
            title="Message Alignment"
            value={general.alignment}
            defaultValue="left"
            onChange={(v) => setGlobalStyleByKey('general.alignment', v)}
          />

          <Divider />
        </>
      )}

      <StyleComponent.Block title="RTL">
        {/* <XField.Switch sx={{ m: 0 }} value={general.rtl} onChange={(v) => setGlobalStyleByKey("general.rtl", v)} /> */}
        <XField.Switch
          sx={{ m: 0 }}
          value={general.rtl}
          onChange={(v) => onGeneralDirChange(v ? 'rtl' : 'ltr')}
        />
      </StyleComponent.Block>

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title={`Structure Padding ${screen}`}
        value={general.structurePadding[screen]}
        onChange={(value) => setGlobalStyleByKey(`general.structurePadding.${screen}`, value)}
      />

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title={`Message Margin ${screen}`}
        value={general.margin[screen]}
        onChange={(value) => setGlobalStyleByKey(`general.margin.${screen}`, value)}
      />
    </Box>
  );
}
