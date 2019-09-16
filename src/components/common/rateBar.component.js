import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-ui-kitten/ui';
import { withStyles } from 'react-native-ui-kitten/theme';
import { StarIconFill } from '../../assets/icons';
import { textStyle } from './style';
class RateBarComponent extends React.Component {
  static defaultProps = {
    icon: StarIconFill,
    value: 0,
    max: 5,
  };

  onRateButtonPress = index => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  renderHintElement = style => {
    const { hintStyle } = this.props;

    return (
      <Text key={0} style={[style, hintStyle]} appearance="hint">
        {this.props.hint}
      </Text>
    );
  };

  renderRateIconElement = (style, index) => {
    const { value, icon, iconStyle, iconDisabledStyle } = this.props;

    const iconElement = icon(style.icon);

    const isEnabled = index < value;
    const stateStyle = isEnabled ? style.iconEnabled : style.iconDisabled;
    const derivedStateStyle = isEnabled ? iconStyle : iconDisabledStyle;

    return React.cloneElement(iconElement, {
      style: [style.icon, iconElement.props.style, stateStyle, derivedStateStyle],
    });
  };

  renderRateButtonElement = (style, index) => {
    const iconElement = this.renderRateIconElement(style, index);

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.65}
        onPress={() => this.onRateButtonPress(index)}
      >
        {iconElement}
      </TouchableOpacity>
    );
  };

  renderRateBar = style => {
    const rates = [];

    for (let index = 0; index < this.props.max; index++) {
      const rateElement = this.renderRateButtonElement(style, index);
      rates.push(rateElement);
    }

    return rates;
  };

  renderComponentChildren = style => {
    const { hint } = this.props;
    const { hint: hintStyle, ...rateBarStyle } = style;

    return [hint ? this.renderHintElement(style.hint) : null, this.renderRateBar(rateBarStyle)];
  };

  render() {
    const { style, themedStyle, hint, ...restProps } = this.props;
    const { container, ...componentStyle } = themedStyle;

    const componentChildren = this.renderComponentChildren(componentStyle);

    return (
      <View {...restProps} style={[container, style]}>
        {componentChildren}
      </View>
    );
  }
}

export const RateBar = withStyles(RateBarComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hint: {
    marginRight: 8,
    ...textStyle.caption2,
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconEnabled: {
    tintColor: theme['color-warning-default'],
  },
  iconDisabled: {
    tintColor: theme['color-basic-default'],
  },
}));
