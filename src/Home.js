import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './redux/action';
import Map from './components/Map';

class Home extends Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Not mandatory
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

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 300,
          backgroundColor: '#303f9f',
          borderBottomLeftRadius: 100,
        }}
      >
        <Text>Luis</Text>
      </View>
    );
  }
}

Home.propTypes = {
  componentId: PropTypes.string,
  triggerDefault: PropTypes.func,
};

Home.defaultProps = {};

Home.options = () => {
  return {
    layout: {
      backgroundColor: '#F7F8F8',
    },
    topBar: {
      noBorder: true,
      elevation: 0,
      background: {
        color: '#303f9f',
      },
    },
  };
};

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
