import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/constants';
import ForgotPassword from '@/containers/ForgotPassword';
import { AuthService } from '@/services';

function ForgotPasswordPage() {
  return (
    <ForgotPassword />
  );
}

export default ForgotPasswordPage;
