import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/constants';
import ResetpasswordContainer from '@/containers/ResetPassword';
import { AuthService } from '@/services';
import { alertSuccess } from '@/utils/notification';
import { Spin } from 'antd';

function ResetPassword() {
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  const { search } = useLocation();
  const values = new URLSearchParams(search);
  const token = values.get('token');
  const email = values.get('email');
  const navigate = useNavigate();

  const verifyToken = async () => {
    if (token && email) {
      const { success } = await AuthService.verifyToken({ token, email });
      if (success) {
        setValidToken(true);
        setLoadingPage(false);
        return;
      }
    }
    setValidToken(false);
    setLoadingPage(false);
  };

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuth) {
    return (<Navigate
      to={{
        pathname: ROUTES.DASHBOARD_PATH,
      }}
    />);
  };

  const onSubmit = async value => {
    setLoading(true);
    const { success } = await AuthService.resetPassword({ ...value, email, token });
    if (success) {
      alertSuccess('PASSWORD_SUCCESS');
      navigate(ROUTES.LOGIN_PATH);
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loadingPage}>
      <ResetpasswordContainer
        onSubmit={onSubmit}
        isLoading={loading}
        isVerify={validToken}
      />
    </Spin>
  );
}

export default ResetPassword;
