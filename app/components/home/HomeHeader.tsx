/* Auto-generated from content.html. Run `node scripts/html-to-tsx.mjs` to regenerate. */

export default function HomeHeader() {
  return (
    <>
      {/* Header 1 */}
          <sticky-header data-sticky-type="always">
            <header className="header-1 header-floating">
              <div className="container-fluid">
                <div className="header-grid">
                  <a className="header-logo" href="/" aria-label="VIKASA">
                    <img
                      src="/assets/img/vikasa/vikasa_logo.png"
                      alt="VIKASA"
                      width={108}
                      height={40}
                    />
                  </a>
                  <drawer-menu>
                    <nav className="header-nav drawer-menu">
                      <div className="d-lg-none header-nav-headings">
                        <a className="header-logo" href="/" aria-label="VIKASA">
                          <img
                            src="/assets/img/vikasa/vikasa_logo.png"
                            alt="VIKASA"
                            width={108}
                      height={40}
                            loading="lazy"
                          />
                        </a>
                        <drawer-opener
                          className="svg-wrapper menu-close"
                          data-drawer=".drawer-menu"
                        >
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </drawer-opener>
                      </div>
                      <ul className="header-menu list-unstyled">
                        <li className="nav-item">
                          <a className="menu-link menu-link-main menu-accrodion" href="/">
                            Home
                            <svg
                              width={10}
                              height={5}
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
                            </svg>
                          </a>
                          <div className="menu-absolute header-submenu submenu-color">
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a className="menu-link" href="/">Home 1</a>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link" href="/index-2">Home 2</a>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link" href="/index-3">Home 3</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a className="menu-link menu-link-main" href="/about">
                            About Us
                          </a>
                        </li>
                        <li className="nav-item nav-item-static">
                          <a
                            className="menu-link menu-link-main menu-accrodion"
                            href="/services"
                          >
                            Services
                            <svg
                              width={10}
                              height={5}
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
                            </svg>
                          </a>
                          <div
                            className="header-megamenu header-submenu menu-absolute submenu-color"
                          >
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a className="menu-link heading fw-300" href="/blog">
                                  WHY CONSULO
                                </a>
                                <ul className="reset-submenu list-unstyled submenu-color">
                                  <li className="nav-item">
                                    <a className="menu-link" href="/services">
                                      <div className="heading text-20 fw-600">
                                        Become a Partner
                                      </div>
                                      <div className="text text-14">
                                        Links customers with trusted Partners who help
                                        them realize greater value—faster—through
                                        Consulo.
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/project">
                                      <div className="heading text-20 fw-600">
                                        Case Studies
                                      </div>
                                      <div className="text text-14">
                                        Hundreds of emerging brands thrive with
                                        Consulo. Discover their journeys.
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/project-details">
                                      <div className="heading text-20 fw-600">
                                        Product Development
                                      </div>
                                      <div className="text text-14">
                                        Speed up innovation to enable quicker,
                                        effective team-driven product launches.
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="menu-link heading fw-300"
                                  href="/project"
                                >
                                  FEATURED CASE STUDY
                                </a>
                                <ul className="reset-submenu list-unstyled submenu-color">
                                  <li className="nav-item">
                                    <a
                                      className="menu-link megamenu-image-wrap"
                                      href="/project-details"
                                    >
                                      <picture>
                                        <source
                                          media="(max-width: 575px)"
                                          srcSet="/assets/img/menu/575.jpg"
                                        />
                                        <img
                                          src="/assets/img/menu/1.jpg"
                                          width={1000}
                                          height={668}
                                          loading="lazy"
                                          alt="Hero Image"
                                        />
                                      </picture>
                                      <div className="content">
                                        <div className="heading text-20 fw-600">
                                          <div className="heading text-20 fw-600">
                                            Consulo Subscriptions
                                          </div>
                                          <div className="text text-14">
                                            Hundreds of emerging brands thrive with
                                            Consulo. Discover their journeys.
                                          </div>
                                        </div>
                                        <div
                                          className="button button--primary"
                                        >
                                          <span className="svg-wrapper">
                                            <svg
                                              className="icon-20"
                                              width={20}
                                              height={20}
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M13.3365 7.84518L6.16435 15.0173L4.98584 13.8388L12.158 6.66667H5.83652V5H15.0032V14.1667H13.3365V7.84518Z"
                                                fill="currentColor"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item megamenu-links">
                                <a
                                  className="menu-link text-14 fw-300"
                                  href="/contact"
                                >
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M8 10.5H16"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M8 14H13.5"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Contact Sales
                                </a>
                                <a
                                  className="menu-link text-14 fw-300"
                                  href="/project-details"
                                >
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                  Watch Demo
                                </a>
                                <a className="menu-link text-14 fw-300" href="/team">
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="9"
                                      cy="9"
                                      r="2"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.298 5.64118 21.5794 6.2255 21.748 7"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 12H15"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 9H14"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 15H16"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Webinars
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item nav-item-static">
                          <a
                            className="menu-link menu-link-main menu-accrodion"
                            href="/faq"
                          >
                            Pages
                            <svg
                              width={10}
                              height={5}
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
                            </svg>
                          </a>
                          <div
                            className="header-megamenu header-submenu menu-absolute submenu-color"
                          >
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a className="menu-link heading fw-300" href="/blog"
                                  >SERVICE PAGES</a
                                >
                                <ul
                                  className="submenu-lists reset-submenu list-unstyled submenu-color"
                                >
                                  <li className="nav-item">
                                    <a className="menu-link" href="/services">
                                      <div className="heading text-18 fw-500">
                                        Services
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/service-details">
                                      <div className="heading text-18 fw-500">
                                        Services Details
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/pricing-plan">
                                      <div className="heading text-18 fw-500">
                                        Pricing Plan
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link heading fw-300" href="/blog"
                                  >BLOG PAGES</a
                                >
                                <ul
                                  className="submenu-lists reset-submenu list-unstyled submenu-color"
                                >
                                  <li className="nav-item">
                                    <a className="menu-link" href="/blog">
                                      <div className="heading text-18 fw-500">Blog</div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/blog-list">
                                      <div className="heading text-18 fw-500">
                                        Blog List
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/blog-details">
                                      <div className="heading text-18 fw-500">
                                        Blog Details
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link heading fw-300" href="/blog"
                                  >OTHER PAGES</a
                                >
                                <ul
                                  className="submenu-lists reset-submenu list-unstyled submenu-color"
                                >
                                  <li className="nav-item">
                                    <a className="menu-link" href="/about">
                                      <div className="heading text-18 fw-500">
                                        About Us
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/contact">
                                      <div className="heading text-18 fw-500">
                                        Contact Us
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/faq">
                                      <div className="heading text-18 fw-500">FAQ</div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/error">
                                      <div className="heading text-18 fw-500">
                                        404 Page
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link heading fw-300" href="/blog"
                                  >PROJECTS</a
                                >
                                <ul
                                  className="submenu-lists reset-submenu list-unstyled submenu-color"
                                >
                                  <li className="nav-item">
                                    <a className="menu-link" href="/project">
                                      <div className="heading text-18 fw-500">
                                        Project
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/project-details">
                                      <div className="heading text-18 fw-500">
                                        Project Details
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/team">
                                      <div className="heading text-18 fw-500">
                                        Our Team
                                      </div>
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="menu-link" href="/team-details">
                                      <div className="heading text-18 fw-500">
                                        Team Details
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="nav-item megamenu-links">
                                <a
                                  className="menu-link text-14 fw-300"
                                  href="/contact"
                                >
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M8 10.5H16"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      opacity="0.5"
                                      d="M8 14H13.5"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Contact Sales
                                </a>
                                <a
                                  className="menu-link text-14 fw-300"
                                  href="/project-details"
                                >
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                  Watch Demo
                                </a>
                                <a className="menu-link text-14 fw-300" href="/team">
                                  <svg
                                    className="icon-18"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="9"
                                      cy="9"
                                      r="2"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.298 5.64118 21.5794 6.2255 21.748 7"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 12H15"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 9H14"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M19 15H16"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  Webinars
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a
                            className="menu-link menu-link-main menu-accrodion"
                            href="/blog"
                          >
                            Blog
                            <svg
                              width={10}
                              height={5}
                              viewBox="0 0 10 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
                            </svg>
                          </a>
                          <div className="header-submenu menu-absolute submenu-color">
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <a className="menu-link" href="/blog">Blog</a>
                              </li>
                              <li className="nav-item">
                                <a className="menu-link" href="/blog-details">
                                  Blog Details
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="menu-link menu-accrodion"
                                  href="/blog-list"
                                >
                                  Blog Style
                                  <svg
                                    width={10}
                                    height={5}
                                    viewBox="0 0 10 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M5 5L0 0H10L5 5Z" fill="currentColor" />
                                  </svg>
                                </a>
                                <div
                                  className="header-grandmenu header-submenu menu-absolute submenu-color"
                                >
                                  <ul className="list-unstyled">
                                    <li className="nav-item">
                                      <a className="menu-link" href="/blog"
                                        >Blog Card</a
                                      >
                                    </li>
                                    <li className="nav-item">
                                      <a className="menu-link" href="/blog-list"
                                        >Blog List</a
                                      >
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a className="menu-link menu-link-main" href="/contact">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </drawer-menu>
                  <div className="header-actions d-flex align-items-center">
                    <drawer-opener
                      className="header-search search-open svg-wrapper"
                      data-drawer=".modal-search"
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.7104 20.2875L18.0004 16.6075C19.4405 14.8119 20.1379 12.5328 19.9492 10.2388C19.7605 7.94476 18.7001 5.81025 16.9859 4.27411C15.2718 2.73797 13.0342 1.91697 10.7333 1.97993C8.43243 2.04289 6.24311 2.98502 4.61553 4.6126C2.98795 6.24018 2.04582 8.4295 1.98286 10.7304C1.9199 13.0313 2.7409 15.2688 4.27704 16.983C5.81318 18.6971 7.94769 19.7576 10.2417 19.9463C12.5357 20.135 14.8148 19.4376 16.6104 17.9975L20.2904 21.6775C20.3834 21.7712 20.494 21.8456 20.6158 21.8964C20.7377 21.9471 20.8684 21.9733 21.0004 21.9733C21.1324 21.9733 21.2631 21.9471 21.385 21.8964C21.5068 21.8456 21.6174 21.7712 21.7104 21.6775C21.8906 21.491 21.9914 21.2418 21.9914 20.9825C21.9914 20.7231 21.8906 20.4739 21.7104 20.2875ZM11.0004 17.9975C9.61592 17.9975 8.26255 17.5869 7.1114 16.8178C5.96026 16.0486 5.06305 14.9553 4.53324 13.6762C4.00342 12.3972 3.8648 10.9897 4.1349 9.63183C4.40499 8.27396 5.07168 7.02668 6.05065 6.04772C7.02961 5.06875 8.27689 4.40206 9.63476 4.13197C10.9926 3.86187 12.4001 4.00049 13.6792 4.53031C14.9583 5.06012 16.0515 5.95733 16.8207 7.10847C17.5899 8.25962 18.0004 9.61299 18.0004 10.9975C18.0004 12.854 17.2629 14.6345 15.9501 15.9472C14.6374 17.26 12.8569 17.9975 11.0004 17.9975Z"
                          fill="currentColor"
                          fillOpacity="1"
                        />
                      </svg>
                    </drawer-opener>
      
                    <modal-search className="theme-modal modal-search">
                      <div className="modal-container">
                        <div className="modal-header">
                          <drawer-opener
                            className="svg-wrapper search-close"
                            data-drawer=".modal-search"
                          >
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                                fill="currentColor"
                              />
                            </svg>
                          </drawer-opener>
                        </div>
                        <div
                          className="modal-main d-flex align-items-center justify-content-center"
                        >
                          <form
                            action="#"
                            className="form-search d-flex align-items-center justify-content-center flex-wrap"
                          >
                            <label htmlFor="Search" className="text text-30"> Search </label>
                            <input
                              type="text"
                              placeholder="What are you looking for?"
                              name="search"
                              id="Search"
                              className="text text-16"
                              autoComplete="off"
                            />
                            <button
                              className="button button--primary"
                              type="submit"
                              aria-label="Search"
                            >
                              <span className="svg-wrapper">
                                <svg
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.7104 20.2875L18.0004 16.6075C19.4405 14.8119 20.1379 12.5328 19.9492 10.2388C19.7605 7.94476 18.7001 5.81025 16.9859 4.27411C15.2718 2.73797 13.0342 1.91697 10.7333 1.97993C8.43243 2.04289 6.24311 2.98502 4.61553 4.6126C2.98795 6.24018 2.04582 8.4295 1.98286 10.7304C1.9199 13.0313 2.7409 15.2688 4.27704 16.983C5.81318 18.6971 7.94769 19.7576 10.2417 19.9463C12.5357 20.135 14.8148 19.4376 16.6104 17.9975L20.2904 21.6775C20.3834 21.7712 20.494 21.8456 20.6158 21.8964C20.7377 21.9471 20.8684 21.9733 21.0004 21.9733C21.1324 21.9733 21.2631 21.9471 21.385 21.8964C21.5068 21.8456 21.6174 21.7712 21.7104 21.6775C21.8906 21.491 21.9914 21.2418 21.9914 20.9825C21.9914 20.7231 21.8906 20.4739 21.7104 20.2875ZM11.0004 17.9975C9.61592 17.9975 8.26255 17.5869 7.1114 16.8178C5.96026 16.0486 5.06305 14.9553 4.53324 13.6762C4.00342 12.3972 3.8648 10.9897 4.1349 9.63183C4.40499 8.27396 5.07168 7.02668 6.05065 6.04772C7.02961 5.06875 8.27689 4.40206 9.63476 4.13197C10.9926 3.86187 12.4001 4.00049 13.6792 4.53031C14.9583 5.06012 16.0515 5.95733 16.8207 7.10847C17.5899 8.25962 18.0004 9.61299 18.0004 10.9975C18.0004 12.854 17.2629 14.6345 15.9501 15.9472C14.6374 17.26 12.8569 17.9975 11.0004 17.9975Z"
                                    fill="currentColor"
                                    fillOpacity="1"
                                  />
                                </svg>
                              </span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </modal-search>
                    <a
                      href="/contact"
                      aria-label="contact us"
                      className="button button--secondary button--slim d-none d-lg-inline-flex"
                    >
                      Let's Talk
                      <span className="svg-wrapper">
                        <svg
                          className="icon-20"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3365 7.84518L6.16435 15.0173L4.98584 13.8388L12.158 6.66667H5.83652V5H15.0032V14.1667H13.3365V7.84518Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </a>
                    <drawer-opener
                      className="svg-wrapper menu-open d-lg-none"
                      data-drawer=".drawer-menu"
                    >
                      <svg
                        width={52}
                        height={52}
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="26"
                          cy="26"
                          r="25.5"
                          fill="white"
                          stroke="currentColor"
                        />
                        <path
                          d="M32.5 18.2857C32.5 17.5757 31.9179 17 31.2 17H14.3C13.5821 17 13 17.5757 13 18.2857C13 18.9958 13.5821 19.5714 14.3 19.5714H31.2C31.9179 19.5714 32.5 18.9957 32.5 18.2857ZM14.3 24.7143H37.7C38.4179 24.7143 39 25.29 39 26C39 26.7101 38.4179 27.2857 37.7 27.2857H14.3C13.5821 27.2857 13 26.7101 13 26C13 25.29 13.5821 24.7143 14.3 24.7143ZM14.3 32.4286H26C26.7179 32.4286 27.3 33.0042 27.3 33.7143C27.3 34.4243 26.7179 35 26 35H14.3C13.5821 35 13 34.4243 13 33.7143C13 33.0042 13.5821 32.4286 14.3 32.4286Z"
                          fill="currentColor"
                        />
                      </svg>
                    </drawer-opener>
                  </div>
                </div>
              </div>
            </header>
          </sticky-header>
    </>
  );
}
