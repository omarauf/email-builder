import { Separator } from '@radix-ui/react-select';
import { usePattern } from './use-pattern';
import { useColorPicker } from './use-color-picker';

const COLOR_OPTIONS = [
  'transparent',
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

interface Props {
  innerValue: string;
  preset?: string[];
  onChange: (value: string) => void;
  setInnerValue: (value: string) => void;
}

export function ColorPickerPopover({
  preset = COLOR_OPTIONS,
  onChange,
  innerValue,
  setInnerValue,
}: Props) {
  const hook = useColorPicker({ onChange, innerValue, setInnerValue });

  const pattern = usePattern();

  return (
    <div className="w-[220px] p-2 select-none">
      <div
        aria-hidden="true"
        ref={hook.saturationRef}
        className="saturation relative h-[150px] rounded"
        onMouseDown={(e) => hook.handleMouseDown(e, 'saturation')}>
        <div
          className="absolute inset-0 rounded"
          style={{
            background: 'linear-gradient(to right, #fff, rgba(0, 0, 0, 0))',
          }}
        />
        <div
          className="absolute inset-0 rounded"
          style={{
            background: 'linear-gradient(to top, #000, rgba(0, 0, 0, 0))',
          }}
        />

        <span
          className="absolute h-2 w-2 rounded-full"
          ref={hook.saturationSelectorRef}
          style={{
            top: '100%',
            left: 0,
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, .3) 0px 0px 1px 1px inset, rgba(0, 0, 0, .4) 0px 0px 1px 2px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="my-1.5 h-2">
        <div
          aria-hidden="true"
          ref={hook.hueRef}
          onMouseDown={(e) => hook.handleMouseDown(e, 'hue')}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 0.5,
            background:
              'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))',
            display: 'flex',
            alignItems: 'center',
          }}>
          <span
            ref={hook.hueSelectorRef}
            className="bg-foreground"
            style={{
              position: 'absolute',
              width: '8px',
              height: '16px',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex w-[33%] flex-col items-center">
          <input
            ref={hook.inputHexRef}
            autoComplete="off"
            onChange={hook.handleHexInput}
            className="w-full border-b border-gray-600 text-center text-xs"
          />

          <p className="text-foreground mt-0.5 text-xs">Hex</p>
        </div>

        <div className="flex w-[21%] flex-col items-center">
          <input
            ref={hook.inputRRef}
            autoComplete="off"
            onChange={hook.handleRgbInput('r')}
            className="w-full border-b border-gray-600 text-center text-xs"
          />

          <p className="text-foreground mt-0.5 text-xs">R</p>
        </div>

        <div className="flex w-[21%] flex-col items-center">
          <input
            ref={hook.inputGRef}
            autoComplete="off"
            onChange={hook.handleRgbInput('g')}
            className="w-full border-b border-gray-600 text-center text-xs"
          />
          <p className="text-foreground mt-0.5 text-xs">G</p>
        </div>

        <div className="flex w-[21%] flex-col items-center">
          <input
            ref={hook.inputBRef}
            autoComplete="off"
            onChange={hook.handleRgbInput('b')}
            className="w-full border-b border-gray-600 text-center text-xs"
          />

          <p className="text-foreground mt-0.5 text-xs">B</p>
        </div>
      </div>

      <Separator className="my-2 border border-dashed" />

      <div className="grid grid-cols-8 gap-1.5">
        {preset.map((color) => (
          <div
            aria-hidden="true"
            key={color}
            onClick={() => hook.handleSelect(color)}
            style={{
              aspectRatio: '1/1',
              borderRadius: '50%',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              ...(color === 'transparent'
                ? {
                    backgroundImage: pattern,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0,10px 10px',
                    color: 'transparent',
                  }
                : {
                    background: color,
                  }),
            }}
          />
        ))}
      </div>
    </div>
  );
}
