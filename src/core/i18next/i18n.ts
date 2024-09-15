import i18n from 'i18next';
import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { zh } from './zh';
import zodZh from 'zod-i18n-map/locales/zh-CN/zod.json';

export type Lang = 'en' | 'zh';

export const i18nAtom = atomWithStorage<Lang>('lang', 'en');
export const useLang = () => useAtomValue(i18nAtom);

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
        zh: { translation: zh, zod: zodZh },
    },
    interpolation: { escapeValue: false },
});

export default i18n;

export { useTranslation } from 'react-i18next';
export const translate = i18n.t.bind(i18n);
