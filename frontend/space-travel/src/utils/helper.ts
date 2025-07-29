import { format } from "date-fns";
import { enUS } from "date-fns/locale";

// This function validates an email address using a regular expression
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

// This function extracts the initials from a name
// It takes the first letter of each word in the name, up to two words
const getInitials = (name: string) => {
  if (!name) return "";

  const word = name.split(" ");
  let initial = "";

  for (let i = 0; i < Math.min(word.length, 2); i++) {
    initial += word[i][0];
  }

  return initial.toUpperCase();
};

// This function formats a date string into a more readable format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return format(date, "do MMM yyyy", { locale: enUS });
};

export { validateEmail, validatePassword, getInitials, formatDate };
