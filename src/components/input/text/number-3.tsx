import * as React from 'react';

import { PlusCircle, MinusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  symbol?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Number3({ symbol, className, ref, ...props }: InputProps) {
  const [hitMax, setHitMax] = React.useState(false);
  const [hitMin, setHitMin] = React.useState(false);
  const incrementInput = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => incrementInput.current!, []);

  const increment = () => {
    incrementInput.current?.stepUp();
    // Supports onchange events
    incrementInput.current?.dispatchEvent(new Event('change', { bubbles: true }));
    // Disbale when hitting max
    setHitMax(incrementInput.current?.value === incrementInput.current?.max);
    setHitMin(incrementInput.current?.value === incrementInput.current?.min);
  };

  const decrement = () => {
    incrementInput.current?.stepDown();
    // Supports onchange events
    incrementInput.current?.dispatchEvent(new Event('change', { bubbles: true }));
    // Disbale when hitting min
    setHitMax(incrementInput.current?.value === incrementInput.current?.max);
    setHitMin(incrementInput.current?.value === incrementInput.current?.min);
  };

  return (
    <div className="flex items-center rounded-lg border p-1.5">
      <button
        type="button"
        disabled={hitMax}
        onClick={increment}
        className="group text-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
        <PlusCircle className="h-4 w-4 group-hover:text-gray-900" />
      </button>

      <div className="relative">
        <input
          type="number"
          className={cn(
            'no-steps w-16 border-0 bg-transparent p-0 text-center outline-none',
            className
          )}
          ref={incrementInput}
          {...props}
        />
        {symbol && <span className="absolute top-0 right-4">{symbol}</span>}
      </div>

      <button
        type="button"
        disabled={hitMin}
        onClick={decrement}
        className="group text-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
        <MinusCircle className="h-4 w-4 group-hover:text-gray-800" />
      </button>
    </div>
  );
}

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// interface Props {
//   value: number;
//   onChange: (value: number) => void;
//   min?: number;
//   max?: number;
//   steps?: number;
//   className?: string;
// }

// export function Number3({ value, onChange, min = 0, max = 100, steps = 1, className }: Props) {
//   const handleIncrement = () => {
//     onChange(Math.min(value + steps, max));
//   };
//   const handleDecrement = () => {
//     onChange(Math.max(value - steps, min));
//   };

//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <div className="flex items-center gap-2">
//         {/* <Button variant="ghost" size="icon" onClick={handleDecrement} disabled={value === min}>
//           <MinusIcon className="h-4 w-4" />
//           <span className="sr-only">Decrement</span>
//         </Button> */}
//         <Input
//           id="number"
//           type="number"
//           value={value}
//           onChange={(e) => onChange(Math.min(Math.max(parseInt(e.target.value, 10), min), max))}
//           min={min}
//           max={max}
//           className="w-full text-center"
//         />
//         <Button variant="ghost" size="icon" onClick={handleIncrement} disabled={value === max}>
//           <PlusIcon className="h-4 w-4" />
//           <span className="sr-only">Increment</span>
//         </Button>
//       </div>
//     </div>
//   );
// }

// function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path d="M5 12h14" />
//     </svg>
//   );
// }

// function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   );
// }
