import { User } from '../types';

// List of admin email addresses
const ADMIN_EMAILS = [
  'admin@crisisclassifier.com',
  'gholder513@gmail.com',
  'gseries513@gmail.com'
  // Add other admin emails here
];

export const handleGoogleLogin = async (credentialResponse: any): Promise<User> => {
  // Decode the JWT token to get user information
  const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
  
  const user: User = {
    email: decoded.email,
    name: decoded.name,
    isAdmin: ADMIN_EMAILS.includes(decoded.email) // Check if user is admin
  };

  // Store auth data in localStorage
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};