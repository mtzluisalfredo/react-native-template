import React from 'react';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Input } from 'react-native-ui-kitten/ui';

class ValidationInputComponent extends React.Component {
  state = {
    value: this.props.value,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value: oldValue } = prevState;
    const { value: newValue } = this.state;

    const becomeValid = !this.isValid(oldValue) && this.isValid(newValue);
    const becomeInvalid = !this.isValid(newValue) && this.isValid(oldValue);

    if (becomeValid) {
      this.props.onChangeText(newValue);
    } else if (becomeInvalid) {
      this.props.onChangeText(undefined);
    }
  }

  onChangeText = text => {
    const { formatter } = this.props;

    const value = formatter ? formatter(text, this.state.value) : text;

    this.setState({ value }, this.onValueChange);
  };

  onValueChange = () => {
    const { value } = this.state;

    if (this.isValid(value) && this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  };

  isValid = value => {
    const { validator } = this.props;

    return validator(value);
  };

  getStatus = () => {
    const { value } = this.state;

    if (value && value.length) {
      return this.isValid(value) ? 'success' : 'danger';
    }

    return undefined;
  };

  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <Input
        autoCapitalize="none"
        status={this.getStatus()}
        {...restProps}
        value={this.state.value}
        style={[themedStyle.container, style]}
        onChangeText={this.onChangeText}
      />
    );
  }
}

export const ValidationInput = withStyles(ValidationInputComponent, theme => ({
  container: {}
}));
