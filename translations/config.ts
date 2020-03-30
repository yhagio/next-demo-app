export const localeMaps = {
  en: 'English',
  jp: '日本語',
}

export enum Languages {
  EN = 'en',
  JP = 'jp',
}

export interface ITranslations {
  [key: string]: string;
}

export const defaultLocale = Languages.EN;

export const LOCALE_KEY = 'myAppLocale';