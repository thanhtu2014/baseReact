/* eslint-disable */

import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { startCase } from 'lodash';

export function camelize(obj) {
  return camelcaseKeys(obj, { deep: true });
}

export function snakelize(obj) {
  return snakecaseKeys(obj, { deep: true });
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[`${key}`] === value);
}

export function parseNotificationMsgErrors({ errors }) {
  const keys = Object.keys(errors);
  let results = '';

  keys.forEach(key => {
    const msg = errors[`${key}`].join(', ');
    results = `${startCase(key)}: ${msg}`;
  });

  return results;
}
