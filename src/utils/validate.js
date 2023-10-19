/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */

import {
  parsePhoneNumberFromString
} from 'libphonenumber-js/max';

export const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const isValidHttpUrl = (string) => {
  const pattern = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  return pattern.test(string);
};


export const validateIPaddress = (ipaddress) => {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  }
  return false;
};

export const validatePhoneNumber = phoneNumber => {
  const phone = parsePhoneNumberFromString(`+${phoneNumber}`);
  return phone && phone.isValid();
};
