/* Site theme tokens — VIKASA brand */
export default function HomePageStyles() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root {
              /* Typography */
              --font-body--family: "Inter", sans-serif;
              --font-body--style: normal;
              --font-body--weight: 400;

              --font-heading--family: "Poppins", sans-serif;
              --font-heading--style: normal;
              --font-heading--weight: 600;

              --font-button--family: "Poppins", sans-serif;
              --font-button--style: normal;
              --font-button--weight: 600;

              /* h1-h6 */
              --font-h1--size: 60px;
              --font-h2--size: 48px;
              --font-h3--size: 36px;
              --font-h4--size: 24px;
              --font-h5--size: 20px;
              --font-h6--size: 16px;

              /* header nav */
              --font-nav-main: 16px;

              /* Colors — VIKASA */
              --color-background: #ffffff;
              --color-foreground: #5e3123;
              --color-foreground-heading: #5e3123;
              --color-foreground-subheading: #5e3123;
              --color-background-subheading: rgba(187, 151, 89, 0.12);
              --color-border-subheading-bg: rgba(94, 49, 35, 0.15);
              --color-primary: #5e3123;
              --color-primary-background: #5e3123;
              --color-primary-hover: #bb9759;
              --color-primary-background-hover: #bb9759;
              --color-border: rgba(94, 49, 35, 0.15);
              --color-border-hover: rgba(187, 151, 89, 0.55);
              --color-shadow: rgba(94, 49, 35, 0.2);
              --color-overlay: rgba(94, 49, 35, 0.55);

              /* Buttons */
              --font-button-size: 16px;
              --font-button-size-mobile: 16px;
              --style-button-height: 56px;
              --style-button-height-mobile: 48px;
              --style-button-slim-height: 52px;
              --style-button-slim-height-mobile: 40px;
              --style-cta-underline-offset: 5px;
              --style-cta-underline-thickness: 1px;

              /* Colors - Primary Button */
              --color-primary-button-text: #ffffff;
              --color-primary-button-background: #5e3123;
              --color-primary-button-border: #5e3123;
              --color-primary-button-icon: #5e3123;
              --color-primary-button-icon-background: #ffffff;

              --color-primary-button-hover-text: #5e3123;
              --color-primary-button-hover-background: #ffffff;
              --color-primary-button-hover-border: #5e3123;
              --color-primary-button-hover-icon: #ffffff;
              --color-primary-button-hover-icon-background: #5e3123;

              /* Colors - Secondary Button */
              --color-secondary-button-text: #5e3123;
              --color-secondary-button-background: #ffffff;
              --color-secondary-button-border: #ffffff;
              --color-secondary-button-icon: #ffffff;
              --color-secondary-button-icon-background: #5e3123;

              --color-secondary-button-hover-text: #ffffff;
              --color-secondary-button-hover-background: #bb9759;
              --color-secondary-button-hover-border: #bb9759;
              --color-secondary-button-hover-icon: #bb9759;
              --color-secondary-button-hover-icon-background: #ffffff;

              /* Colors - Input */
              --color-input-background: #ffffff;
              --color-input-text: #5e3123;
              --color-input-border: rgba(94, 49, 35, 0.2);
              --color-input-hover-background: #ffffff;
              --color-input-hover-text: #5e3123;
              --color-input-hover-border: rgba(187, 151, 89, 0.55);

              /* Borders */
              --style-border-width-buttons-primary: 1px;
              --style-border-width-buttons-secondary: 1px;
              --style-border-radius-buttons-primary: 40px;
              --style-border-radius-buttons-secondary: 40px;

              --style-border-width-inputs: 1px;
              --style-border-radius-inputs: 8px;
              --style-border-width: 1px;

              /* Focus */
              --focus-outline-width: 1px;
              --focus-outline-offset: 3px;

              /* Pagination */
              --style-pagination-border-width: 1px;
              --pagination-item-foreground: #5e3123;
              --pagination-item-background: rgba(187, 151, 89, 0.15);
              --pagination-item-border: rgba(187, 151, 89, 0.15);
              --pagination-item-active-foreground: #ffffff;
              --pagination-item-active-background: #5e3123;
              --pagination-item-active-border: #5e3123;

              /* Swiper */
              --swiper-navigation-size: 16px;
              --swiper-navigation-color: #ffffff;
              --swiper-navigation-background-color: transparent;
              --swiper-navigation-hover-color: #ffffff;
              --swiper-navigation-hover-background-color: rgba(187, 151, 89, 0.35);
              --swiper-pagination-bullet-inactive-color: rgba(242, 242, 242);
              --swiper-pagination-color: #5e3123;
              --swiper-pagination-bullet-inactive-opacity: 1;
            }

            @media (max-width: 767px) {
              :root {
                --font-h1--size: 48px;
                --font-h2--size: 40px;
                --font-h3--size: 28px;
                --font-h4--size: 20px;
                --font-h5--size: 18px;
              }
            }`,
        }}
      />
    </>
  );
}
