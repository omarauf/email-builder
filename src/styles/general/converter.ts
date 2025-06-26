import type { Css } from '@/types';
import { converter } from '@/utils/converter';
import type { GlobalGeneralStyle } from './type';

export function globalGeneralStyleConverter(general: GlobalGeneralStyle) {
  const { backgroundColor, margin, structurePadding, width } = general;

  const globalCss: Css[] = [
    {
      type: 'desktop',
      classname: '*',
      styles: { padding: '0', margin: '0' },
    },
    {
      type: 'desktop',
      classname: 'body',
      styles: { backgroundColor },
    },
    {
      type: 'desktop',
      classname: 'body',
      styles: { width: '100%', height: '100%' },
    },
    {
      type: 'desktop',
      classname: 'table',
      styles: { borderCollapse: 'collapse', borderSpacing: '0px' },
    },
    {
      type: 'desktop',
      classname: 'table td, body, .es-wrapper',
      styles: { borderCollapse: 'collapse', borderSpacing: '0px' },
    },
    {
      type: 'desktop',
      classname: 'p:empty',
      styles: { minHeight: '1em' },
    },
    // {
    //   type: "mobile",
    //   classname: ".m-txt-r, .m-txt-c, .m-txt-l",
    //   styles: { display: "inline !important" },
    // },
  ];

  const utilityCss: Css[] = [
    {
      type: 'mobile',
      classname: '.adapt-img',
      styles: { width: '100%', height: 'auto' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-hidden',
      styles: { display: 'none !important' },
    },
    //
    {
      type: 'desktop',
      classname: '.d-hidden',
      styles: { display: 'none' },
    },
    {
      type: 'mobile',
      classname: '.d-hidden',
      styles: { display: 'block !important' },
    },
    // button
    {
      type: 'mobile',
      classname: '.m-fw',
      styles: { display: 'block' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-il',
      styles: { display: 'inline-block' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-txt-l',
      styles: { textAlign: 'left' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-txt-c',
      styles: { textAlign: 'center' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-txt-r',
      styles: { textAlign: 'right' },
      important: true,
    },
    {
      type: 'mobile',
      classname: '.m-txt-j',
      styles: { textAlign: 'justify' },
      important: true,
    },
  ];

  const generalCss: Css[] = [
    {
      type: 'desktop',
      classname: '.stripe-body',
      styles: { width: `${width}px` },
    },
    {
      type: 'mobile',
      classname: '.stripe-body',
      styles: { width: '100%', maxWidth: `${width}px` },
      important: true,
    },
    {
      type: 'mobile',
      classname: 'table',
      styles: { width: '100%', maxWidth: `${width}px` },
      important: true,
    },
    {
      type: 'desktop',
      classname: '.email-paddings',
      styles: { padding: converter.inset(margin.desktop, 'px') },
    },
    {
      type: 'mobile',
      classname: '.email-paddings',
      styles: { padding: converter.inset(margin.mobile, 'px') },
      important: true,
    },
  ];

  const structureCss: Css[] = [
    {
      type: 'desktop',
      classname: '.structure',
      styles: { padding: converter.inset(structurePadding.desktop, 'px') },
    },
  ];

  const containerCss: Css[] = [];

  const css: Css[] = [...globalCss, ...utilityCss, ...generalCss, ...structureCss, ...containerCss];

  return css;
}
