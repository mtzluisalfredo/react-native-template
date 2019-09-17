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
  }

  componentDidMount() {
    const { user } = this.state;
    this.initApp(user);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.state;
    if (user !== prevState.user) {
      this.initApp(user);
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

const mapStateToProps = () => {
  return {};
};

const actions = { ...counterActions };

Initializing.options = () => {
  return {
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
  };
};

export default connect(
  mapStateToProps,
  actions
)(Initializing);
