import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import store from '../../redux/store';

persistStore(store);
export const registerScreen = (screenName, component) => {
  Navigation.registerComponentWithRedux(screenName, () => component, Provider, store);
};

export const setRoot = (type, id, children) => Navigation.setRoot({
  root: {
    [type]: {
      id,
      children,
    },
  },
});

export const navigationRegisterDefault = () => Navigation.setDefaultOptions({
  layout: {
    backgroundColor: 'red',
    orientation: ['portrait'],
  },
});
