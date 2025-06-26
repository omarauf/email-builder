import type { Meta } from './meta';
import type { Styles } from '../styles/type';
import type { Tree } from '../nodes/tree/type';

export interface EmailTemplateData {
  tree: Tree;
  styles: Styles;
  meta: Meta;
}
