import i18n from 'i18next';
import { initReactI18next,I18nextProvider,useTranslation } from 'react-i18next';
import en from './en.json';  //英文字典檔
import tw from './zh-TW.json';  //中文字典檔

const res = {  // 設定字典檔
  en: {    translation: en,  },
  'zh-TW': {    translation: tw,  },
};
i18n.use(initReactI18next).init({
  resources: res,
  lng: 'zh-TW',             //預設語言
  fallbackLng: 'zh-TW',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});

export default function I18nRoot(props) {
  const { i18n } = useTranslation();  // 翻譯函數=i18n 
  return (
  <I18nextProvider i18n={i18n}>
    <button onClick={() => i18n.changeLanguage('zh-TW')}> 中文 </button>  {/* i18n翻譯 */}
    <button onClick={() => i18n.changeLanguage('en')}> english </button>  {/* i18n翻譯 */}
    <br />
  {props.children}  {/* 所有的子元件 */}
  </I18nextProvider>
  );
}
