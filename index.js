/**
 * @format
 */

import 'config/reactotronConfig';
import { Navigation } from 'react-native-navigation';
import 'navigation/index';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'loginScreen',
      },
    },
  });
});
