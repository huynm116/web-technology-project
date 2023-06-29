export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  //  { label: 'Super admin pages'},

  { label: 'PAGES', type: 'label' },
  {
    name: 'Student',
    icon: 'people',
    children: [
      { name: 'Student List', iconText: 'SL', path: '/students/list' },
      { name: 'New Student', iconText: 'NS', path: '/students/create' },
      { name: 'Add Student to Room', iconText: 'AS', path: '/students/add' },
    ]
  },
  {
    name: 'Room',
    icon: 'room',
    children: [
      { name: 'Room List', iconText: 'RL', path: '/rooms/list' },
      { name: 'New Room', iconText: 'NR', path: '/rooms/create' },
    ]
  },
  {
    name: 'Dormitory',
    icon: 'business',
    children: [
      { name: 'Dorm List', iconText: 'DL', path: '/dorms/list' },
      { name: 'New Dorm', iconText: 'ND', path: '/dorms/create' },
    ]
  },
  { label: 'ACCOUNTS', type: 'label' },
  {
    name: 'Account',
    icon: 'people_outline',
    children: [
      { name: 'Account List', iconText: 'AL', path: '/accounts/list' },
      { name: 'New Account', iconText: 'NA', path: '/accounts/create' },
    ]
  },
];
