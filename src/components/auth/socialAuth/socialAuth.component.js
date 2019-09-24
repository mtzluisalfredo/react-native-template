import React from 'react';
import {
  View,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten/theme';
import { Text } from 'react-native-ui-kitten/ui';
import { textStyle } from '../../common';
import {
  FacebookIconFill,
  GoogleIconFill,
  TwitterIconFill,
} from '../../../assets/icons';
import { SocialButton } from './socialAuthButton.component';

class SocialAuthComponent extends React.Component {

  renderCaptionElement = (style) => {
    const { hint } = this.props;

    return (
      <Text
        style={style}>
        {hint}
      </Text>
    );
  };

  render() {
    const { themedStyle, hintStyle, iconStyle, hint, ...restProps } = this.props;
    const { buttonContainer, ...componentStyle } = themedStyle;

    return (
      <View {...restProps}>
        {hint ? this.renderCaptionElement([componentStyle.hint, hintStyle]) : null}
        <View style={buttonContainer}>
          <SocialButton
            activeOpacity={0.75}
            icon={GoogleIconFill}
            iconStyle={iconStyle}
            onPress={this.props.onGooglePress}
          />
          <SocialButton
            activeOpacity={0.75}
            icon={FacebookIconFill}
            iconStyle={iconStyle}
            onPress={this.props.onFacebookPress}
          />
          <SocialButton
            activeOpacity={0.75}
            icon={TwitterIconFill}
            iconStyle={iconStyle}
            onPress={this.props.onTwitterPress}
          />
        </View>
      </View>
    );
  }
}

export const SocialAuth = withStyles(SocialAuthComponent, (theme) => ({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  hint: {
    alignSelf: 'center',
    marginBottom: 16,
    ...textStyle.subtitle,
  },
}));

