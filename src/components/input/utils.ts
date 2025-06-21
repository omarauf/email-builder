import type { Option } from './common/types';

type Value = string | number;

// export function convertOptions<T extends Value, U extends object>(
//   options: T extends string
//     ? (Option<string, Value> & U)[] | string[]
//     : (Option<number, Value> & U)[] | number[]
// ): (Option<T, Value> & U)[] {
//   const _options = options.map((option) => {
//     if (typeof option === "string" || typeof option === "number") {
//       return {
//         id: option,
//         name: option,
//       } as Option<T, Value> & U;
//     }

//     return option as Option<T, Value> & U;
//   });

//   return _options;
// }

export function convertOptions<T extends Value, U extends object>(
  options: (Option<T, Value> & U)[] | T[]
): (Option<T, Value> & U)[] {
  const opts = options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        id: option,
        name: option,
      } as Option<T, Value> & U;
    }

    return option as Option<T, Value> & U;
  });

  return opts;
}
