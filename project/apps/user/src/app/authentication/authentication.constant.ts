export const AUTH_MESSAGES = {
  AUTH_USER_EXISTS: 'User with this email exists',
  AUTH_USER_NOT_FOUND: 'User not found',
  AUTH_USER_PASSWORD_WRONG: 'User password is wrong',
};

export const AUTH_VALIDATION_MESSAGES = {
  email: {
    invalidFormat: 'The email is not valid',
  },
  firstName: {
    invalidFormat: 'First name should be string',
    minLength: 'Minimum first name length must be 3',
    maxLength: 'Maximum first name length must be 50',
  },
  lastName: {
    invalidFormat: 'Last name should be string',
    minLength: 'Minimum last name length must be 3',
    maxLength: 'Maximum last name length must be 50',
  },
  password: {
    invalidFormat: 'Password should be string',
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
};
