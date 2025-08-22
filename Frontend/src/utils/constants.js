export const USER_ROLES = {
  ADMIN: 'admin',
  QA: 'qa',
  FINANCE: 'finance',
  PRODUCTION: 'production'
};

export const DASHBOARD_ROUTES = {
  [USER_ROLES.ADMIN]: '/dashboard/admin',
  [USER_ROLES.QA]: '/dashboard/qa',
  [USER_ROLES.FINANCE]: '/dashboard/finance',
  [USER_ROLES.PRODUCTION]: '/dashboard/production'
};

export const ALERT_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
};
