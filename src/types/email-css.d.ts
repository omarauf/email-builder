/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CSSProperties } from 'react';
import React from 'react';

declare module 'react' {
  // Extend CustomTypeOptions
  interface CSSProperties {
    msoTableLspace?: string;
    msoTableRspace?: string;
  }
}
