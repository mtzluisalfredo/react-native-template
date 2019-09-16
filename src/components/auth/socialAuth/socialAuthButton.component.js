import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten/theme';
import {
  Button,
} from 'react-native-ui-kitten/ui';

class SocialAuthButtonComponent extends React.Component {

  renderIcon = (style) => {
    const { icon, iconStyle } = this.props;

    return icon({ ...style, ...StyleSheet.flatten(iconStyle) });
  };

  render() {
    const { themedStyle, ...restProps } = this.props;

    return (
      <Button
        appearance='ghost'
        size='giant'
        {...restProps}
        icon={this.renderIcon}
      />
    );
  }
}

export const SocialButton = withStyles(SocialAuthButtonComponent, (theme) => ({
  icon: {
    width: 24,
    height: 24,
  },
}));
