import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from './redux/actions';
import { goToAuth, goHome } from './navigation';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class Initializing extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      user: 0,
    };
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    });
  }

  componentDidMount() {
    const { user } = this.state;
    const { login_success } = this.props;
    this.initApp(login_success);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.state;
    const { login_success } = this.props;
    if (login_success !== prevProps.login_success) {
      this.initApp(login_success);
    }
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'toggleDrawer') {
      Navigation.mergeOptions('SideDrawer', {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  };

  initApp = user => {
    try {
      if (user) {
        goHome();
      } else {
        goToAuth();
      }
    } catch (err) {
      goToAuth();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { login_success } = state.counter;
  return { login_success };
};

const actions = { ...counterActions };

export default connect(
  mapStateToProps,
  actions
)(Initializing);
