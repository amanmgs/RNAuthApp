import { isValidEmail } from './validators';

export const validateSignup = (name: string, email: string, password: string): string | null => {
  if (!name || !email || !password) return 'All fields are required';
  if (!isValidEmail(email)) return 'Invalid email address';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};
