/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { CSSProperties } from 'react';

declare module 'react' {
  // Extend CustomTypeOptions
  interface CSSProperties {
    msoTableLspace?: string;
    msoTableRspace?: string;
  }
}
