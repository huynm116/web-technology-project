export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  //  { label: 'Super admin pages'},

  { label: 'PAGES', type: 'label' },
  {
    name: 'Student',
    icon: 'people',
    children: [
      { name: 'Student list', iconText: '', path: '/students/list' },
      { name: 'New Student', iconText: '', path: '/students/create' },
      { name: 'Add student to room', iconText: '', path: '/students/add' },
    ]
  },
  {
    name: 'Room',
    icon: 'room',
    children: [
      { name: 'Room list', iconText: '', path: '/rooms/list' },
      { name: 'New Room', iconText: '', path: '/rooms/create' },
    ]
  },
  {
    name: 'Dormitory',
    icon: 'business',
    children: [
      { name: 'Dorm list', iconText: '', path: '/dorms/list' },
      { name: 'New Dorm', iconText: '', path: '/dorms/create' },
    ]
  },
  { label: 'ACCOUNTS', type: 'label' },
  {
    name: 'Account',
    icon: 'group',
    children: [
      { name: 'Account list', iconText: '', path: '/accounts/list' },
      { name: 'New account', iconText: '', path: '/accounts/create' },
    ]
  },
];
