import { User } from '../types';

export const handleGoogleLogin = async (credentialResponse: any): Promise<User> => {
  // Decode the JWT token to get user information
  const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
  
  const user: User = {
    email: decoded.email,
    name: decoded.name
  };

  // Store auth data in localStorage
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};