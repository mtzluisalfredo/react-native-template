import { Navigation } from 'react-native-navigation';

/**
 * Navigation default options
 */
const navigationRegisterDefault = () => Navigation.setDefaultOptions({
  layout: {
    backgroundColor: 'red',
    orientation: ['portrait'],
  },
});


export default navigationRegisterDefault;
