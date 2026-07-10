import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sticky-header": CustomElementProps & {
        "data-sticky-type"?: string;
      };
      "drawer-menu": CustomElementProps;
      "drawer-opener": CustomElementProps & {
        "data-drawer"?: string;
        "data-modal"?: string;
      };
      "modal-search": CustomElementProps;
      "scroll-top": CustomElementProps;
      "testi-slider": CustomElementProps;
      "hero-slider": CustomElementProps;
      "banner-slider": CustomElementProps;
      "project-slider": CustomElementProps;
      "counter-up": CustomElementProps;
      "team-slider": CustomElementProps;
      "testimonial-slider": CustomElementProps;
      "faq-accordion": CustomElementProps;
      "accordion-horizontal": CustomElementProps;
      "progress-bar": CustomElementProps;
    }
  }
}
