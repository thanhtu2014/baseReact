import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthLayout, GuestLayout } from '@/components/Layouts';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignUpPage from '@/pages/SignUpPage';
import { ROUTES } from '@/constants';
import Dashboard from '@/pages/DashboardPage';
import Reports from '@/pages/ReportsPage';
import ContactUs from '@/pages/ContactUsPage';
import ForgotPasswordPage from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '@/utils/locale';

function Routing() {
  const { search } = useLocation();
  const values = new URLSearchParams(search);
  const lang = values.get('lang') || getCurrentLanguage();
  const { i18n } = useTranslation();
  i18n.changeLanguage(lang === 'th' ? 'th' : 'en');

  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route
          path={ROUTES.ROOT_PATH}
          element={<Navigate to={ROUTES.DASHBOARD_PATH} />}
        />
        <Route path={ROUTES.LOGIN_PATH} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP_PATH} element={<SignUpPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>
      {/* <Route element={<AuthLayout />}> */}
        <Route path="/me" element={<ProfilePage />} />
        <Route path={ROUTES.DASHBOARD_PATH} element={<Dashboard />} />
        <Route path={ROUTES.REPORTS.INDEX} element={<Reports />} />
        <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
      {/* </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routing;
