import NextI18Next from 'next-i18next';

const nexti18n = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['jp']
  // browserLanguageDetection: false,
  // serverLanguageDetection: false,
  // shallowRender: true
  // debug: true
});

export default nexti18n;

export const { appWithTranslation, withTranslation } = nexti18n;
