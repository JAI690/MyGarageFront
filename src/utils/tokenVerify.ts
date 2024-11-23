import {jwtDecode, JwtPayload} from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp ? Date.now() >= exp * 1000 : false;
  } catch {
    return true; // Si no se puede decodificar, lo consideramos expirado
  }
};
