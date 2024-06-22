export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Allocation',
    href: '/allocation',
  },
  {
    label: 'Course',
    href: '/course',
  },
  {
    label: 'Department',
    href: '/department',
  },
  {
    label: 'Professor',
    href: '/professor',
  },
];

export default NAV_ITEMS;
