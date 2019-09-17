import { Navigation } from 'react-native-navigation';
import Amplify from 'aws-amplify';

import config from './../aws-exports';
import registerScreens from './screens';

Amplify.configure(config);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing',
      },
    },
  });
});
