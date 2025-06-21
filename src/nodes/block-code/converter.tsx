import type { Css } from '@/types';
import type { BlockCode } from './type';

export function BlockCodeConverter({ block }: { block: BlockCode }) {
  const { data } = block;
  const { code } = data;

  const css: Css[] = [];

  return { html: <td>{code}</td>, css };
}
