import moment from 'moment';
import 'moment/locale/th';
import { getCurrentLanguage } from './locale';

export const momentLocale = (date) => {
  const lang = getCurrentLanguage();
  return moment(date).locale(lang);
};

export const parseDateTime = (date) => momentLocale(new Date(date)).format('MMM DD, YYYY HH:mm');

export const parseDateYear = (date) => momentLocale(new Date(date)).format('MMM, YYYY');

export const formatCurrency = (price, languageCode = 'th') => {
  let localeCode = 'th-TH';
  let currency = 'THB';

  switch (languageCode) {
    case 'th':
      localeCode = 'th-TH';
      currency = 'THB';
      break;
    case 'en':
      localeCode = 'en-US';
      currency = 'USD';
      break;
    default:
      localeCode = 'th-TH';
      currency = 'THB';
      break;
  }

  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};
