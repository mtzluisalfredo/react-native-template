import i18n from 'i18n-js';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment/min/moment-with-locales';
import en from './en';
import de from './de';

const deviceLocale = DeviceInfo.getDeviceLocale();

moment.locale(deviceLocale);

i18n.fallbacks = true;
i18n.translations = { en, de };
i18n.locale = deviceLocale;

const translate = key => {
  return i18n.t(key);
};

export default translate;
