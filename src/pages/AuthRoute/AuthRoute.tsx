import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTER from '../../config/router';

interface Props {
  children: React.ReactElement;
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const authUser = localStorage.getItem('authUser');
  if (!authUser) return <Navigate to={ROUTER.AUTH.LOGIN} replace={true} />;
  return children;
};

export default AuthRoute;
