/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string): any | null => {
  try {
    const decodedToken = jwtDecode(JSON.stringify(token));
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
