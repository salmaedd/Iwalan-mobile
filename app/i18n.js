/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

const addLocaleData = require('react-intl').addLocaleData;
const enLocaleData = require('react-intl/locale-data/en');
const frLocaleData = require('react-intl/locale-data/fr');
const arLocaleData = require('react-intl/locale-data/ar');

const enTranslationMessages = require('./translations/en.json');
const frTranslationMessages = require('./translations/fr.json');
const arTranslationMessages = require('./translations/ar.json');

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);
addLocaleData(arLocaleData);

const DEFAULT_LOCALE = 'fr';

// prettier-ignore
const appLocales = [
  'fr',
  'ar',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, frTranslationMessages) : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
  ar: formatTranslationMessages('ar', arTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
