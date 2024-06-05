export const siteConfig = {
  name: "ByteBlitz",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/nyedr/blog-app",
    docs: "https://ui.shadcn.com",
  },
};

export const userConfig = {
  defaultUserImage:
    "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
};

export interface NavMenuItem {
  title: string;
  description: string;
}

export const blogCategories: NavMenuItem[] = [
  {
    title: "Development",
    description:
      "Explore cutting-edge development techniques, languages, and frameworks.",
  },
  {
    title: "Design",
    description:
      "Insights and trends in user interface and user experience design.",
  },
  {
    title: "Infrastructure",
    description:
      "Dive into the world of DevOps, cloud computing, and IT infrastructure.",
  },
  {
    title: "Emerging Tech",
    description:
      "Latest updates on AI, blockchain, IoT, and other revolutionary technologies.",
  },
  {
    title: "Security",
    description:
      "Essential security practices, cyber threats, and data protection strategies.",
  },
  {
    title: "Consumer Tech",
    description:
      "Reviews and news on the latest gadgets and consumer technology developments.",
  },
];
