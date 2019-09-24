import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as counterActions from './redux/actions';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import { goToAuth } from './navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class Home extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.login_success !== this.props.login_success) {
      goToAuth();
    }
  }
  signOutClick = () => {
    this.props.signOut();
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Text category="h4">Welcome to UI Kitten</Text>
        <Button onPress={() => this.signOutClick()}>CLOSE SESSION 🌚</Button>
      </Layout>
    );
  }
}

Home.propTypes = {
  componentId: PropTypes.string,
  triggerDefault: PropTypes.func,
};

Home.defaultProps = {};

Home.options = () => {};

const mapStateToProps = state => {
  const { login_success } = state.counter;
  return { login_success };
};

const actions = { ...counterActions };

export default connect(
  mapStateToProps,
  actions
)(Home);
