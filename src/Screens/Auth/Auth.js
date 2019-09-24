import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import * as counterActions from './../../redux/actions';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Button, Text } from 'react-native-ui-kitten/ui';
import { SignInForm2, SocialAuth } from './../../components/auth';
import { ScrollableAvoidKeyboard, ImageOverlay, textStyle } from './../../components/common';

import { goHome } from './../../navigation';

class AuthComponent extends Component {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.login_success !== this.props.login_success) {
      goHome();
    }
  }

  onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  onSignInButtonPress = () => {
    this.props.login(this.state.formData);
  };

  onSignUpButtonPress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: 'SignUp',
        name: 'SignUp',
      },
    });
  };

  onGoogleButtonPress = () => {
    // this.props.onGooglePress();
  };

  onFacebookButtonPress = () => {
    // this.props.onFacebookPress();
  };

  onTwitterButtonPress = () => {
    // this.props.onTwitterPress();
  };

  onFormDataChange = formData => {
    this.setState({ formData });
  };

  render() {
    console.log('TCL: Auth -> render -> render', this.props);
    const { themedStyle } = this.props;
    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay style={themedStyle.container} source="">
          <View style={themedStyle.headerContainer}>
            <Text style={themedStyle.helloLabel} category="h1">
              Hello
            </Text>
            <Text style={themedStyle.signInLabel} category="s1">
              Sign in to your account
            </Text>
          </View>
          <SignInForm2
            style={themedStyle.formContainer}
            onForgotPasswordPress={this.onForgotPasswordButtonPress}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.signInButton}
            textStyle={textStyle.button}
            size="giant"
            disabled={!this.state.formData}
            onPress={this.onSignInButtonPress}
          >
            SIGN IN
          </Button>
          <SocialAuth
            style={themedStyle.socialAuthContainer}
            iconStyle={themedStyle.socialAuthIcon}
            hint="Or Sign In using Social Media"
            onGooglePress={this.onGoogleButtonPress}
            onFacebookPress={this.onFacebookButtonPress}
            onTwitterPress={this.onTwitterButtonPress}
          />
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.signUpText}
            appearance="ghost"
            activeOpacity={0.75}
            onPress={this.onSignUpButtonPress}
          >
            Don't have an account? Sign Up
          </Button>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

AuthComponent.propTypes = {
  componentId: PropTypes.string,
  triggerDefault: PropTypes.func,
};

AuthComponent.defaultProps = {};

const mapStateToProps = state => {
  const { login_success } = state.counter;
  return { login_success };
};

const actions = { ...counterActions };

const AuthComponentRedux = connect(
  mapStateToProps,
  actions
)(AuthComponent);

export const Auth = withStyles(AuthComponentRedux, theme => {
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
