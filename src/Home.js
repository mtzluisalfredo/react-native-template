import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as counterActions from './redux/actions';
import { Button, Layout, Text } from 'react-native-ui-kitten';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class Home extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text category="h4">Welcome to UI Kitten</Text>
        <Button onPress={() => console.log('Hello')}>Toggle Dark Mode 🌚</Button>
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
  console.log('TCL: state', state);
  return {};
};

const actions = { ...counterActions };

export default connect(
  mapStateToProps,
  actions
)(Home);
