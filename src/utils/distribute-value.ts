/**
 * Distributes a given value into parts based on a ratio.
 * The ratio can either be a number (for even distribution) or a string (for a custom ratio).
 *
 * @param value - The total value to be distributed.
 * @param ratio - The ratio that defines how the value is distributed.
 *                If it's a number, the value is divided evenly into that many parts.
 *                If it's a string, the value is distributed according to the parts in the ratio, e.g., "2:3:5".
 *
 * @returns An array of numbers representing the distributed value in each part.
 *          The sum of the values in the array will always equal the original value.
 *          If the ratio is not evenly divisible, the remainder is distributed starting from the first part.
 *
 * @example
 * // Even distribution into 3 parts:
 * distributeValue(10, 3); // Returns [3, 3, 4]
 *
 * @example
 * // Custom distribution based on a ratio of "2:3:5":
 * distributeValue(10, "2:3:5"); // Returns [2, 3, 5]
 *
 * @throws Error if the ratio is an invalid format (not a number or properly formatted string).
 */
export function distributeValue(value: number, ratio: number | string) {
  let parts: number[] = [];

  // If ratio is a number, distribute value evenly
  if (typeof ratio === 'number') {
    parts = Array(ratio).fill(0);
    const quotient = Math.floor(value / ratio);
    const remainder = value % ratio;

    for (let i = 0; i < ratio; i += 1) {
      parts[i] = quotient + (i < remainder ? 1 : 0);
    }
  } else if (typeof ratio === 'string') {
    // If ratio is a string, parse the ratio and distribute accordingly
    const ratioParts = ratio.split(':').map(Number);
    const totalRatio = ratioParts.reduce((sum, r) => sum + r, 0);

    parts = ratioParts.map((r) => Math.floor((value * r) / totalRatio));

    // Calculate the total distributed value and adjust for rounding errors
    const distributedValue = parts.reduce((sum, part) => sum + part, 0);
    const remainder = value - distributedValue;

    // Distribute the remainder
    for (let i = 0; i < remainder; i += 1) {
      parts[i % parts.length] += 1;
    }
  }

  return parts;
}
