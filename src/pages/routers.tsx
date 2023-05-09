import { LoadingOverlay } from '@mantine/core';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../config/router';
import AppLayout from '../containers/AppLayout';
import AuthRoute from './AuthRoute';
import { StatisticsProvider } from '../contexts/StatisticsContext';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const Login = React.lazy(() => import('./Login'));
const Profile = React.lazy(() => import('./Profile'));
const ActiveUser = React.lazy(() => import('./ActiveUser'));
const Home = React.lazy(() => import('../components/Home'));
const ResetPassword = React.lazy(() => import('../components/ResetPassword'));
const Products = React.lazy(() => import('../components/Products'));
const Orders = React.lazy(() => import('../components/Orders'));
const Accounts = React.lazy(() => import('../components/Accounts'));
const Categories = React.lazy(() => import('../components/Categories'));
const _404NotFound = React.lazy(() => import('../components/common/_404NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTER.AUTH.ACTIVE}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <ActiveUser />
          </Suspense>
        }
      />
      <Route
        path={ROUTER.AUTH.LOGIN}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path={ROUTER.AUTH.RESET_PASSWORD}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTER.AUTH.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path={ROUTER.HOME.INDEX}
        element={
          <AuthRoute>
            <AppLayout />
          </AuthRoute>
        }
      >
        <Route
          path={ROUTER.HOME.INDEX}
          element={
            <StatisticsProvider>
              <Home />
            </StatisticsProvider>
          }
        />
        <Route path={ROUTER.NAV.CATEGORIES.INDEX} element={<Categories />} />
        <Route path={ROUTER.NAV.PRODUCTS.INDEX} element={<Products />} />
        <Route path={ROUTER.NAV.ORDERS.INDEX} element={<Orders />} />
        <Route path={ROUTER.NAV.ACCOUNTS.INDEX} element={<Accounts />} />
        <Route
          path={ROUTER.AUTH.PROFILE}
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <Profile />
            </Suspense>
          }
        />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
