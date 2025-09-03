import polyglotI18nProvider from 'ra-i18n-polyglot';
import customVietnameseMessages from './vi'; // Import file tùy chỉnh

const messages = {
  vi: customVietnameseMessages,
};

const i18nProvider = polyglotI18nProvider(
  locale => messages[locale as keyof typeof messages],
  'vi'
);

export default i18nProvider;