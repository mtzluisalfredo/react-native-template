import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { mapping, light, dark } from '@eva-design/eva';
import { withStyles, ApplicationProvider } from 'react-native-ui-kitten/theme';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// import translate from '../locales';

// const extraProps = { translate };
const extraProps = { };

class DynamicStatusBarComponent extends React.Component {
  getStatusBarContent = () => {
    if (this.props.currentTheme === 'dark') {
      return 'dark-content';
    } else {
      return 'light-content';
    }
  };

  render() {
    const { themedStyle } = this.props;

    const androidStatusBarBgColor = themedStyle.container.backgroundColor;
    const barStyle = this.getStatusBarContent();

    return (
      <View style={themedStyle.container}>
        <StatusBar backgroundColor={androidStatusBarBgColor} barStyle={barStyle} />
      </View>
    );
  }
}

const DynamicStatusBar = withStyles(DynamicStatusBarComponent, theme => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    height: Platform.select({
      ios: getStatusBarHeight(),
      android: 0,
    }),
  },
}));

class Wrapper extends React.Component {
  render() {
    const { Screen, ScreenProps, app } = this.props;
    const appTheme = 'dark';
    return (
      <ApplicationProvider mapping={mapping} theme={appTheme === 'dark' ? dark : light}>
        {/*{!statusBarDisabled && <DynamicStatusBar currentTheme={app.theme} />}*/}
        <Screen {...ScreenProps} />
      </ApplicationProvider>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  app,
});

const mapDispatchToProps = {
  //
};

const WrapperComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);

const wrapper = Screen => props => (
  <WrapperComponent
    Screen={Screen}
    ScreenProps={{ ...props, ...extraProps }}
    // statusBarDisabled={statusBarDisabled}
  />
);

export default wrapper;
