const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 30;

export function checkUsername(username: string) {
  if (username.length < MIN_USERNAME_LENGTH) {
    return {
      success: false,
      error: `Username must be at least ${MIN_USERNAME_LENGTH} characters long.`,
    };
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return {
      success: false,
      error: `Username cannot be longer than ${MAX_USERNAME_LENGTH} characters.`,
    };
  }

  return {
    success: true,
  };
}

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 30;

export function checkPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      success: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    };
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return {
      success: false,
      error: `Password cannot be longer than ${MAX_PASSWORD_LENGTH} characters.`,
    };
  }

  return {
    success: true,
  };
}

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 50;

export function checkName(name: string) {
  if (name.length < MIN_NAME_LENGTH) {
    return {
      success: false,
      error: `Name must be at least ${MIN_NAME_LENGTH} characters long.`,
    };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return {
      success: false,
      error: `Name cannot be longer than ${MAX_NAME_LENGTH} characters.`,
    };
  }

  return {
    success: true,
  };
}
