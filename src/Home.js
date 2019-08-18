import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './redux/action';
import Map from './components/Map';
import { Button, Layout, Text } from 'react-native-ui-kitten';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class Home extends Component {
  // componentDidMount() {
  //   this.navigationEventListener = Navigation.events().bindComponent(this);
  // }

  // componentWillUnmount() {
  //   // Not mandatory
  //   if (this.navigationEventListener) {
  //     this.navigationEventListener.remove();
  //   }
  // }

  // navigationButtonPressed = ({ buttonId }) => {
  //   if (buttonId === 'toggleDrawer') {
  //     Navigation.mergeOptions('SideDrawer', {
  //       sideMenu: {
  //         left: {
  //           visible: true,
  //         },
  //       },
  //     });
  //   }
  // };

  render() {
    console.log(this.props)
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
  return {
    message: state.defaultReducer.message,
    count: state.defaultReducer.count,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
