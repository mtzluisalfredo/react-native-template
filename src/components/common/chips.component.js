import React from 'react';
import { View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten/theme';

class ChipsComponent extends React.Component {
  renderIcon = () => {
    const { icon, themedStyle } = this.props;

    return icon ? icon(themedStyle.icon) : null;
  };

  render() {
    const { themedStyle, children, style } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        {this.renderIcon()}
        {children}
      </View>
    );
  }
}

export const Chips = withStyles(ChipsComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme['color-primary-default'],
    borderRadius: 100,
  },
  icon: {
    width: 13,
    height: 13,
    tintColor: 'white',
  },
}));
