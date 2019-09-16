import React from 'react';
import { View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Button } from 'react-native-ui-kitten/ui';
import { textStyle, ValidationInput } from '../../common';
import { EyeOffIconFill, PersonIconFill } from '../../../assets/icons';

import { NameValidator, PasswordValidator } from '../../../core/validators';

class SignInForm2Component extends React.Component {
  state = {
    username: undefined,
    password: undefined,
  };

  componentDidUpdate(prevProps, prevState) {
    const oldFormValid = this.isValid(prevState);
    const newFormValid = this.isValid(this.state);

    const isStateChanged = this.state !== prevState;
    const becomeValid = !oldFormValid && newFormValid;
    const becomeInvalid = oldFormValid && !newFormValid;
    const remainValid = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  onUsernameInputTextChange = username => {
    this.setState({ username });
  };

  onPasswordInputTextChange = password => {
    this.setState({ password });
  };

  isValid = value => {
    const { username, password } = value;

    return username !== undefined && password !== undefined;
  };

  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <ValidationInput
            textStyle={textStyle.paragraph}
            placeholder="User Name"
            icon={PersonIconFill}
            validator={NameValidator}
            onChangeText={this.onUsernameInputTextChange}
          />
          <ValidationInput
            style={themedStyle.passwordInput}
            textStyle={textStyle.paragraph}
            placeholder="Password"
            icon={EyeOffIconFill}
            secureTextEntry={true}
            validator={PasswordValidator}
            onChangeText={this.onPasswordInputTextChange}
          />
          <View style={themedStyle.forgotPasswordContainer}>
            <Button
              style={themedStyle.forgotPasswordButton}
              textStyle={themedStyle.forgotPasswordText}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={this.onForgotPasswordButtonPress}
            >
              Forgot your password?
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export const SignInForm2 = withStyles(SignInForm2Component, theme => ({
  container: {},
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: theme['text-hint-color'],
    ...textStyle.subtitle,
  },
}));
