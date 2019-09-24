import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten/ui';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Avatar } from 'react-native-ui-kitten/ui';
import { textStyle } from './style';

class ActivityAuthoringComponent extends React.Component {
  render() {
    const { style, themedStyle, photo, name, date, ...restProps } = this.props;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <Avatar style={themedStyle.authorPhoto} source={photo} />
        <View style={themedStyle.authorInfoContainer}>
          <Text style={themedStyle.authorNameLabel}>{name}</Text>
          <Text style={themedStyle.dateLabel} appearance="hint" category="p2">
            {date}
          </Text>
        </View>
      </View>
    );
  }
}

export const ActivityAuthoring = withStyles(ActivityAuthoringComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfoContainer: {
    marginLeft: 16,
  },
  authorPhoto: {
    margin: 0,
  },
  authorNameLabel: textStyle.subtitle,
  dateLabel: textStyle.paragraph,
}));
