// import { useShallow } from "zustand/react/shallow";
// import { useBuilderStore } from "@/hooks/use-builder-store";
// import { globalHeadingStyleConverter } from "@/styles/heading/converter";
// import { globalGeneralStyleConverter } from "@/styles/general/converter";
// import { globalButtonStyleConverter } from "@/styles/button/converter";
// import { globalStripeStyleConverter } from "@/styles/stripe/converter";
// import { classname } from "@/constant/classname";
// import { converter } from "@/util/converter";
// import { StripeTypeOptions } from "@/constant/stripe";

// export function useTreeStyle() {
//   const [styles, screen] = useBuilderStore(useShallow((s) => [s.styles, s.screen]));
//   const { button, general, heading, stripe } = styles;
//   const { alignment, backgroundColor, list, margin, rtl, structurePadding, width } = general;

//   const stripeStyle = globalStripeStyleConverter(stripe);
//   const generalStyle = globalGeneralStyleConverter(general);
//   const headingStyle = globalHeadingStyleConverter(heading);
//   const buttonStyle = globalButtonStyleConverter(button);

//   return {
//     // Global Stripe
//     [`.${classname.stripeWrapper}`]: stripeStyle[screen].common,
//     ...StripeTypeOptions.reduce(
//       (acc, stripeType) => ({
//         ...acc,
//         [`.${classname.stripeWrapper}.${classname.stripeWrapperType(stripeType)}`]: {
//           ...stripeStyle[screen].stripe[stripeType].wrapper,

//           [`.${classname.stripeBody(stripeType)}`]: {
//             ...stripeStyle[screen].stripe[stripeType].body,

//             a: stripeStyle[screen].stripe[stripeType].anchor,

//             "a:hover": stripeStyle[screen].stripe[stripeType].anchorHover,
//           },
//         },
//       }),
//       {}
//     ),

//     // Global Structure Style
//     [`.${classname.structure}`]: {
//       padding: converter.inset(general.structurePadding[screen], "px"),
//     },

//     // Global Heading Style
//     h1: headingStyle[screen].h1,
//     h2: headingStyle[screen].h2,
//     h3: headingStyle[screen].h3,
//     h4: headingStyle[screen].h4,
//     h5: headingStyle[screen].h5,
//     h6: headingStyle[screen].h6,
//   };
// }
