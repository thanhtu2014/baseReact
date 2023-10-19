const ENV = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  OPEN_API_BASE_URL: process.env.REACT_APP_OPEN_API_BASE_URL,
  WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL,
};

const BATCH_MAX_FILE_SIZE = 10; // 10MB
const MAX_FILE_SIZE = 3; // 3MB
const QUICK_SEND_MAX_CHARACTERS = 536;

const StorageKey = {
  authUser: '@auth:user',
};

const ROUTES = {
  ROOT_PATH: '/',
  DASHBOARD_PATH: '/dashboard',
  LOGIN_PATH: '/signin',
  SIGNUP_PATH: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/update-password',
  REPORTS: {
    INDEX: '/reports',
  },
  CONTACT_US: '/contact-us',
  SERVER_ERROR: '/500',
};

const NOTIFCATION_MESSAGE_CONFIG = {
  placement: 'bottom',
  duration: 2.5,
  className: 'hestia-message',
};

const LOG_TYPES = [
  {
    label: 'Used',
    value: 4,
  },
  {
    label: 'Refund',
    value: 5,
  },
];

const LoadingStatus = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const PAGE_SIZE = 10;

export {
  ENV,
  ROUTES,
  StorageKey,
  LoadingStatus,
  NOTIFCATION_MESSAGE_CONFIG,
  PAGE_SIZE,
  BATCH_MAX_FILE_SIZE,
  LOG_TYPES,
  MAX_FILE_SIZE,
  QUICK_SEND_MAX_CHARACTERS,
};
