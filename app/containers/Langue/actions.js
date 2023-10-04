/*
 *
 * Brand Langue
 *
 */

import { CHANGE_LANGUAGE } from './constants';

export function changeLanguage(value) {
  return {
    type: CHANGE_LANGUAGE,
    value,
  };
}
