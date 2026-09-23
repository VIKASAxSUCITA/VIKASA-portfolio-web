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

              /* Colors — VIKASA Advisory Academy (navy + accent blue) */
              --color-background: #ffffff;
              --color-foreground: #002068;
              --color-foreground-heading: #002068;
              --color-foreground-subheading: #002068;
              --color-background-subheading: rgba(8, 88, 240, 0.12);
              --color-border-subheading-bg: rgba(0, 32, 104, 0.15);
              --color-primary: #002068;
              --color-primary-background: #002068;
              --color-primary-hover: #0858f0;
              --color-primary-background-hover: #0858f0;
              --color-border: rgba(0, 32, 104, 0.15);
              --color-border-hover: rgba(8, 88, 240, 0.55);
              --color-shadow: rgba(0, 32, 104, 0.2);
              --color-overlay: rgba(0, 32, 104, 0.55);

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
              --color-primary-button-background: #002068;
              --color-primary-button-border: #002068;
              --color-primary-button-icon: #002068;
              --color-primary-button-icon-background: #ffffff;

              --color-primary-button-hover-text: #002068;
              --color-primary-button-hover-background: #ffffff;
              --color-primary-button-hover-border: #002068;
              --color-primary-button-hover-icon: #ffffff;
              --color-primary-button-hover-icon-background: #002068;

              /* Colors - Secondary Button */
              --color-secondary-button-text: #002068;
              --color-secondary-button-background: #ffffff;
              --color-secondary-button-border: #ffffff;
              --color-secondary-button-icon: #ffffff;
              --color-secondary-button-icon-background: #002068;

              --color-secondary-button-hover-text: #ffffff;
              --color-secondary-button-hover-background: #0858f0;
              --color-secondary-button-hover-border: #0858f0;
              --color-secondary-button-hover-icon: #0858f0;
              --color-secondary-button-hover-icon-background: #ffffff;

              /* Colors - Input */
              --color-input-background: #ffffff;
              --color-input-text: #002068;
              --color-input-border: rgba(0, 32, 104, 0.2);
              --color-input-hover-background: #ffffff;
              --color-input-hover-text: #002068;
              --color-input-hover-border: rgba(8, 88, 240, 0.55);

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
              --pagination-item-foreground: #002068;
              --pagination-item-background: rgba(8, 88, 240, 0.15);
              --pagination-item-border: rgba(8, 88, 240, 0.15);
              --pagination-item-active-foreground: #ffffff;
              --pagination-item-active-background: #002068;
              --pagination-item-active-border: #002068;

              /* Swiper */
              --swiper-navigation-size: 16px;
              --swiper-navigation-color: #ffffff;
              --swiper-navigation-background-color: transparent;
              --swiper-navigation-hover-color: #ffffff;
              --swiper-navigation-hover-background-color: rgba(8, 88, 240, 0.35);
              --swiper-pagination-bullet-inactive-color: rgba(242, 242, 242);
              --swiper-pagination-color: #002068;
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
