import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Switch } from '@/components/ui/switch';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function GeneralSetting() {
  const [styles, screen, setGlobalStyleByKey, onGeneralDirChange] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setGlobalStyleByKey, s.onGeneralDirChange])
  );
  const { general } = styles;

  return (
    <div>
      <StyleComponent.Color
        title="General Background Color"
        value={general.backgroundColor}
        onChange={(c) => setGlobalStyleByKey('general.backgroundColor', c)}
      />

      <Separator />

      {screen === 'desktop' && (
        <>
          <StyleComponent.Block title="Message Content Width">
            <XField.Number
              value={general.width}
              onChange={(v) => setGlobalStyleByKey('general.width', v)}
              className="w-32"
              min={320}
              max={900}
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.Alignment
            title="Message Alignment"
            value={general.alignment}
            defaultValue="left"
            onChange={(v) => setGlobalStyleByKey('general.alignment', v)}
          />

          <Separator />
        </>
      )}

      <StyleComponent.Block title="RTL">
        <Switch
          checked={general.rtl}
          onCheckedChange={(v) => onGeneralDirChange(v ? 'rtl' : 'ltr')}
        />
      </StyleComponent.Block>

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title={`Structure Padding ${screen}`}
        value={general.structurePadding[screen]}
        onChange={(value) => setGlobalStyleByKey(`general.structurePadding.${screen}`, value)}
      />

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title={`Message Margin ${screen}`}
        value={general.margin[screen]}
        onChange={(value) => setGlobalStyleByKey(`general.margin.${screen}`, value)}
      />
    </div>
  );
}
