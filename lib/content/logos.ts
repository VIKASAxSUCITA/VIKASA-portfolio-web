export type LogoItem = {
  id: string;
  name: string;
  /** Optional image; when missing, the name is shown as a text mark. */
  logo?: string;
};

/** Partner logos shown in the home marquee. */
export const PARTNER_LOGOS: LogoItem[] = [
  {
    id: "p1",
    name: "Company Buildings",
    logo: "/assets/img/partner_logo/partner-1.jpg",
  },
  {
    id: "p2",
    name: "Company Emblem",
    logo: "/assets/img/partner_logo/partner-2.jpg",
  },
  {
    id: "p3",
    name: "Rolex",
    logo: "/assets/img/partner_logo/partner-3.png",
  },
  {
    id: "p4",
    name: "Glycon",
    logo: "/assets/img/partner_logo/partner-4.png",
  },
];

/** Client logos shown in the home marquee. */
export const CLIENT_LOGOS: LogoItem[] = [
  {
    id: "c1",
    name: "Corporate",
    logo: "/assets/img/client_logo/client-1.jpg",
  },
  {
    id: "c2",
    name: "ArrowPrime Financial",
    logo: "/assets/img/client_logo/client-2.jpg",
  },
  {
    id: "c3",
    name: "Tech Company",
    logo: "/assets/img/client_logo/client-3.jpg",
  },
];
