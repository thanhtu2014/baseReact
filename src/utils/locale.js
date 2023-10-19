import { getI18n } from 'react-i18next';

export function getCurrentLanguage() {
  return getI18n().language || 'en';
}
