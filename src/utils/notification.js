import { notification } from 'antd';
import { NOTIFCATION_MESSAGE_CONFIG } from '@/constants';
import { translationCode, translationMessage } from './translate';

export function setSuccessMessage({ title, description, onClose = () => { }, options = {} }) {
  const notifyMessageMaskDOM = document.getElementById('notify-message__mask');
  notifyMessageMaskDOM.classList.toggle('d-block', true);
  document.body.classList.toggle('disable-scroll', true);

  notification.success({
    message: title,
    description,
    onClose: () => {
      notifyMessageMaskDOM.classList.toggle('d-block', false);
      document.body.classList.toggle('disable-scroll', false);
      onClose();
    },
    ...NOTIFCATION_MESSAGE_CONFIG,
    ...options,
  });
  return null;
}

export function setErrorMessage({ title, description }) {
  const notifyMessageMaskDOM = document.getElementById('notify-message__mask');
  notifyMessageMaskDOM.classList.toggle('d-block', true);
  document.body.classList.toggle('disable-scroll', true);

  notification.error({
    message: title,
    description,
    onClose: () => {
      notifyMessageMaskDOM.classList.toggle('d-block', false);
      document.body.classList.toggle('disable-scroll', false);
    },
    ...NOTIFCATION_MESSAGE_CONFIG,
  });
  return null;
}

export function setWarningMessage({ title, description, redirectUrl = '' }) {
  const notifyMessageMaskDOM = document.getElementById('notify-message__mask');
  notifyMessageMaskDOM.classList.toggle('d-block', true);
  document.body.classList.toggle('disable-scroll', true);

  notification.warning({
    message: title,
    description,
    onClose: () => {
      notifyMessageMaskDOM.classList.toggle('d-block', false);
      document.body.classList.toggle('disable-scroll', false);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },
    ...NOTIFCATION_MESSAGE_CONFIG,
  });
  return null;
}

export function setInfoMessage({ title, description, redirectUrl = '' }) {
  const notifyMessageMaskDOM = document.getElementById('notify-message__mask');
  notifyMessageMaskDOM.classList.toggle('d-block', true);
  document.body.classList.toggle('disable-scroll', true);

  notification.info({
    message: title,
    description,
    onClose: () => {
      notifyMessageMaskDOM.classList.toggle('d-block', false);
      document.body.classList.toggle('disable-scroll', false);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },
    ...NOTIFCATION_MESSAGE_CONFIG,
  });
  return null;
}

export function alertError(code) {
  const { title, desc } = translationCode(code);
  setErrorMessage({
    title: title || 'Internal Server Error',
    description: desc || 'Internal Server Error'
  });
};

export function alertSuccess(code) {
  const { title, desc } = translationMessage(code);
  setSuccessMessage({
    title,
    description: desc
  });
};
