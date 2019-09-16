import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Text } from 'react-native-ui-kitten/ui';
import { MessageCircleIconOutline } from '../../assets/icons';

class CommentsButtonComponent extends React.Component {
  render() {
    const { style, themedStyle, textStyle, children, ...restProps } = this.props;

    return (
      <TouchableOpacity style={[themedStyle.container, style]} {...restProps}>
        {MessageCircleIconOutline(themedStyle.icon)}
        <Text style={[themedStyle.valueLabel, textStyle]} category="p2">
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

export const CommentsButton = withStyles(CommentsButtonComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme['text-hint-color'],
  },
  valueLabel: {
    marginHorizontal: 8,
  },
}));
