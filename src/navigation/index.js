import React from 'react';
import { Navigation } from 'react-native-navigation';
import LoginScreen from 'screens/LoginScreen';
import AppStoreProvider from 'store/AppStoreProvider';

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <AppStoreProvider>
        <Component {...props} />
      </AppStoreProvider>
    );
    return <EnhancedComponent />;
  };
}

Navigation.registerComponent('loginScreen', () => WrappedComponent(LoginScreen));
