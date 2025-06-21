import { useRef, useEffect } from 'react';
import type { HSL } from '@/utils/color/type';
import { converter, validator } from '@/utils/color';

const MAX_HUE = 360;

interface Props {
  innerValue: string;
  onChange: (value: string) => void;
  setInnerValue: (value: string) => void;
}

export function useColorPicker({ onChange, innerValue, setInnerValue }: Props) {
  const saturationRef = useRef<HTMLDivElement>(null);
  const saturationSelectorRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const hueSelectorRef = useRef<HTMLSpanElement>(null);
  const isDown = useRef<boolean>(false);
  const optionActive = useRef<'saturation' | 'hue' | undefined>(undefined);

  const inputHexRef = useRef<HTMLInputElement>(null);
  const inputRRef = useRef<HTMLInputElement>(null);
  const inputGRef = useRef<HTMLInputElement>(null);
  const inputBRef = useRef<HTMLInputElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const hslColor = useRef<HSL>({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    if (!inputHexRef.current || !saturationRef.current) return;
    if (!inputRRef.current || !inputGRef.current || !inputBRef.current) return;

    inputHexRef.current.value = innerValue;
    const hsl = converter.hex.hsl(innerValue);
    const rgb = converter.hex.rgb(innerValue);

    hslColor.current = hsl;
    saturationRef.current.style.background = `hsl(${hsl.h},100%,50%)`;
    inputRRef.current.value = `${rgb.r}`;
    inputGRef.current.value = `${rgb.g}`;
    inputBRef.current.value = `${rgb.b}`;

    calculateCoordinatesFromHsl(hslColor.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateHslFromCoordinates = (x: number, y: number): void => {
    hslColor.current.s = x;
    hslColor.current.l = (50 * (1 - x / 100) + 50) * (1 - y / 100);
  };

  const handleHueCursorPosition = (e: React.MouseEvent<HTMLDivElement> | MouseEvent): void => {
    if (!hueRef.current || !saturationRef.current) return;
    if (!hueSelectorRef.current || !hueSelectorRef.current) return;
    if (!inputHexRef.current || !inputRRef.current || !inputGRef.current || !inputBRef.current)
      return;

    const hueRect = hueRef.current.getBoundingClientRect();
    const hueWidth = hueRef.current.offsetWidth - hueSelectorRef.current.offsetWidth;
    const mousePositionX = e.clientX - hueRect.left;

    mousePosition.current = {
      x:
        mousePositionX >= 0 && mousePositionX <= hueWidth
          ? mousePositionX
          : mousePositionX > hueWidth
            ? hueWidth
            : 0,
      y: 0,
    };

    hueSelectorRef.current.style.left = `${mousePosition.current.x}px`;
    const hue = (mousePosition.current.x / hueWidth) * MAX_HUE;
    hslColor.current.h = hue;
    saturationRef.current.style.background = `hsl(${hue},100%,50%)`;

    const hex = converter.hsl.hex(hslColor.current);
    const rgb = converter.hex.rgb(hex);

    inputHexRef.current.value = hex;
    inputRRef.current.value = `${rgb.r}`;
    inputGRef.current.value = `${rgb.g}`;
    inputBRef.current.value = `${rgb.b}`;
  };

  const handleSaturationCursorPosition = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ): void => {
    if (!saturationRef.current || !saturationSelectorRef.current) return;
    if (!inputHexRef.current || !inputRRef.current || !inputGRef.current || !inputBRef.current)
      return;

    const saturationRect = saturationRef.current.getBoundingClientRect();
    const [saturationWidth, saturationHeight] = [
      saturationRef.current.offsetWidth,
      saturationRef.current.offsetHeight,
    ];
    const [mousePositionX, mousePositionY] = [
      e.clientX - saturationRect.left,
      e.clientY - saturationRect.top,
    ];

    mousePosition.current = {
      x:
        mousePositionX >= 0 && mousePositionX <= saturationWidth
          ? mousePositionX
          : mousePositionX > saturationWidth
            ? saturationWidth
            : 0,
      y:
        mousePositionY >= 0 && mousePositionY <= saturationHeight
          ? mousePositionY
          : mousePositionY > saturationHeight
            ? saturationHeight
            : 0,
    };

    saturationSelectorRef.current.style.top = `${mousePosition.current.y}px`;
    saturationSelectorRef.current.style.left = `${mousePosition.current.x}px`;

    calculateHslFromCoordinates(
      (mousePosition.current.x * 100) / saturationWidth,
      (mousePosition.current.y * 100) / saturationHeight
    );

    const hex = converter.hsl.hex(hslColor.current);
    const rgb = converter.hex.rgb(hex);

    inputHexRef.current.value = hex;
    inputRRef.current.value = `${rgb.r}`;
    inputGRef.current.value = `${rgb.g}`;
    inputBRef.current.value = `${rgb.b}`;
  };

  const handleMouseMove = (e: MouseEvent): void => {
    e.preventDefault();

    if (!isDown.current) return;

    if (optionActive.current === 'saturation') handleSaturationCursorPosition(e);
    else if (optionActive.current === 'hue') handleHueCursorPosition(e);

    // onChange(converter.hsl.hex(hslColor.current));
    setInnerValue(converter.hsl.hex(hslColor.current));
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent,
    option: 'saturation' | 'hue'
  ): void => {
    isDown.current = true;
    optionActive.current = option;

    if (optionActive.current === 'saturation') handleSaturationCursorPosition(e);
    else if (optionActive.current === 'hue') handleHueCursorPosition(e);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (): void => {
    isDown.current = false;

    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);

    optionActive.current = undefined;

    const hex = converter.hsl.hex(hslColor.current);

    onChange(hex);
    setInnerValue(hex);
  };

  const calculateCoordinatesFromHsl = ({ h, s, l }: HSL): void => {
    if (!hueRef.current || !saturationRef.current) return;
    if (!hueSelectorRef.current || !saturationSelectorRef.current) return;

    const x = s;
    const y = -(l / (50 * (1 - s / 100) + 50) - 1) * 100;

    const [saturationWidth, saturationHeight] = [
      saturationRef.current.offsetWidth,
      saturationRef.current.offsetHeight,
    ];

    hueSelectorRef.current.style.left = `${
      (h * (hueRef.current.offsetWidth - hueSelectorRef.current.offsetWidth)) / MAX_HUE
    }px`;
    saturationSelectorRef.current.style.top = `${(y * saturationHeight) / 100}px`;
    saturationSelectorRef.current.style.left = `${(x * saturationWidth) / 100}px`;
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!saturationRef.current) return;

    const input = e.target.value;
    e.target.value = `#${input.substr(1)}`;

    if (!validator.hex(input)) return;

    const hsl = converter.hex.hsl(input);

    calculateCoordinatesFromHsl(hsl);

    hslColor.current = hsl;
    saturationRef.current.style.background = `hsl(${hsl.h},100%,50%)`;

    onChange(e.target.value);
    setInnerValue(e.target.value);
  };

  const handleRgbInput =
    (channel: 'r' | 'g' | 'b') =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!saturationRef.current) return;

      const input = e.target.value;
      const v = parseInt(input, 10);

      if (v < 0 || v > 255) return;

      const r = channel === 'r' ? v : parseInt(inputRRef.current?.value || '0', 10);
      const g = channel === 'g' ? v : parseInt(inputGRef.current?.value || '0', 10);
      const b = channel === 'b' ? v : parseInt(inputBRef.current?.value || '0', 10);

      const hsl = converter.rgb.hsl({ r, g, b });
      const hex = converter.rgb.hex({ r, g, b });

      calculateCoordinatesFromHsl(hsl);

      hslColor.current = hsl;
      saturationRef.current.style.background = `hsl(${hsl.h},100%,50%)`;

      onChange(hex);
      setInnerValue(hex);
    };

  const handleSelect = (hexColor: string) => {
    if (!saturationRef.current) return;
    if (!inputHexRef.current || !inputRRef.current || !inputGRef.current || !inputBRef.current)
      return;

    const hsl = converter.hex.hsl(hexColor);

    calculateCoordinatesFromHsl(hsl);

    const rgb = converter.hex.rgb(hexColor);

    inputHexRef.current.value = hexColor;
    inputRRef.current.value = `${rgb.r}`;
    inputGRef.current.value = `${rgb.g}`;
    inputBRef.current.value = `${rgb.b}`;

    hslColor.current = hsl;
    saturationRef.current.style.background = `hsl(${hsl.h},100%,50%)`;

    onChange(hexColor);
    setInnerValue(hexColor);
  };

  return {
    saturationRef,
    saturationSelectorRef,
    hueRef,
    hueSelectorRef,
    inputHexRef,
    inputRRef,
    inputGRef,
    inputBRef,
    handleSelect,
    handleRgbInput,
    handleHexInput,
    handleMouseDown,
  };
}
