import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import * as counterActions from './../../redux/actions';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Button, Text } from 'react-native-ui-kitten/ui';
import { SignUpForm2, ConfirmSignUp } from './../../components/auth';
import { ScrollableAvoidKeyboard, ImageOverlay, textStyle } from './../../components/common';

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    });
  }

  state = {
    formData: undefined,
  };
  onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  onSignUpButtonPress = () => {
    this.props.signUp(this.state.formData);
    // this.props.login(this.state.formData);
    // this.props.login(this.state.formData);
  };

  onConfirmSignUpButtonPress = () => {
    const { password, username } = this.props;
    console.log('TCL: SignUpComponent -> onConfirmSignUpButtonPress -> password, username', password, username)
    const { formData } = this.state;
    console.log('TCL: SignUpComponent -> onConfirmSignUpButtonPress -> formData', formData)
    this.props.confirmSignUp(username, formData.code, password);
  };

  onSignInButtonPress = () => {
    Navigation.pop(this.props.componentId);
  };

  onFormDataChange = formData => {
    this.setState({ formData });
  };

  onCancelValidate = () => {
    this.props.cancelValidate();
    this.onSignInButtonPress();
  };

  render() {
    console.log('TCL: Auth -> render -> render', this.props);
    const { themedStyle, signUp_success } = this.props;
    const confirm = signUp_success;
    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay style={themedStyle.container}>
          <View style={themedStyle.headerContainer}>
            <Text style={themedStyle.helloLabel} category="h1">
              Hello
            </Text>
            <Text style={themedStyle.signInLabel} category="s1">
              Sign in to your account
            </Text>
          </View>
          <SignUpForm2
            confirm={confirm}
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.signInButton}
            textStyle={textStyle.button}
            size="giant"
            disabled={!this.state.formData}
            onPress={confirm ? this.onConfirmSignUpButtonPress : this.onSignUpButtonPress}
          >
            {confirm ? 'VALIDATE CODE' : 'SIGN UP'}
          </Button>
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.signUpText}
            appearance="ghost"
            activeOpacity={0.75}
            onPress={this.onCancelValidate}
          >
            Cancel Validate Code
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

SignUpComponent.propTypes = {
  componentId: PropTypes.string,
  triggerDefault: PropTypes.func,
};

SignUpComponent.defaultProps = {};

const mapStateToProps = state => {
  const { signUp_success, username, password } = state.counter;
  return { signUp_success, username, password };
};

const actions = { ...counterActions };

const AuthComponentRedux = connect(
  mapStateToProps,
  actions
)(SignUpComponent);

export const SignUp = withStyles(AuthComponentRedux, theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
    headerContainer: {
      minHeight: 216,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    socialAuthContainer: {
      marginTop: 32,
    },
    helloLabel: {
      color: 'white',
      ...textStyle.headline,
    },
    signInLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    socialAuthIcon: {
      tintColor: 'white',
    },
    signInButton: {
      marginHorizontal: 16,
    },
    signUpButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: 'white',
      ...textStyle.subtitle,
    },
  };
});
