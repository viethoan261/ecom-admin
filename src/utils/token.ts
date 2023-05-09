import jwt_decode from 'jwt-decode';
import { Role } from '../types/models/user';

export interface DecodedToken {
  Email?: string;
  Fullname?: string;
  ID?: number;
  Role?: Role;
  Username?: string;
  aud?: string;
  exp?: number;
  iss?: string;
}

export const setToken = (data: { Token: string }) => {
  localStorage.setItem('token', data.Token);
};

export const decodeToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  const { Email, Fullname, ID, Role, Username }: DecodedToken = jwt_decode(token.replace('Bearer ', ''));
  localStorage.setItem(
    'authUser',
    JSON.stringify({
      id: ID,
      fullname: Fullname,
      email: Email,
      role: Role,
      username: Username,
    })
  );
};
