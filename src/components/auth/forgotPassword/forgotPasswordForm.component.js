import React from 'react';
import { View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten/theme';
import { textStyle, ValidationInput } from '../../common';
import { EmailIconFill } from '../../../assets/icons';
import { EmailValidator } from '../../../core/validators';

class ForgotPasswordFormComponent extends React.Component {
  state = {
    email: undefined,
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

  onEmailInputTextChange = email => {
    this.setState({ email });
  };

  isValid = value => {
    const { email } = value;

    return email !== undefined;
  };

  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          textStyle={textStyle.paragraph}
          placeholder="Email"
          icon={EmailIconFill}
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
      </View>
    );
  }
}

export const ForgotPasswordForm = withStyles(ForgotPasswordFormComponent, theme => ({
  container: {},
}));
