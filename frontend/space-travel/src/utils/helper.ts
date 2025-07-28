const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    !/\s/.test(password)
  ); // At least 8 characters, 1 uppercase letter, 1 number, no spaces
};

export { validateEmail, validatePassword };
