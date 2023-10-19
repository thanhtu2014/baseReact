import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks';
import { logout } from '@/store/auth/authSlice';
import logoImage from '@/assets/images/logo.png';
import i18n from '@/i18n';

import './index.scss';

const { Title, Paragraph } = Typography;

function HomePage() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { t: translation } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="logo" />
        </div>
        <select onChange={changeLanguage}>
          <option value="th">
            Thai
          </option>
          <option value="en">
            English
          </option>
        </select>
        <div className="intro">
          <Title level={1} className="intro__title">
            {translation('home.title')}
          </Title>
          <Paragraph className="intro__description">
            {translation('home.description')}
          </Paragraph>
          <div className="intro__actions">
            {isAuth && (
              <>
                <Button type="primary">
                  <Link to="/me">{translation('button.profile')}</Link>
                </Button>
                <Button onClick={handleLogout}>{translation('button.logout')}</Button>
              </>
            )}
            {!isAuth && (
              <Button type="primary">
                <Link to="/login">{translation('button.login')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
