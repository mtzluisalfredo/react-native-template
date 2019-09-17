import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';

export class Auth extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      title: 'Bienvenido',
      subTitle: 'Inicio de sesión',
    };
  }

  render() {
    const { title, subTitle } = this.state;
    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
        <Text>Luis Alfredo</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
console.log('TCL: state', state)
  return { state };
};

const mapDispatchToProps = {};

Auth.options = () => {
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
  mapDispatchToProps
)(Auth);
