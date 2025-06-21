import type React from 'react';
import { useState } from 'react';

export function useTab(defaultTab?: number) {
  const [value, setValue] = useState(() => defaultTab || 0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return [value, handleChange] as const;
}
