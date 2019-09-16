import React from 'react';
import { ThemeType, withStyles } from 'react-native-ui-kitten/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ScrollableAvoidKeyboardComponent extends React.Component {
  render() {
    const { style, contentContainerStyle, themedStyle, ...restProps } = this.props;

    return (
      <KeyboardAwareScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={[themedStyle.container, style]}
        contentContainerStyle={[themedStyle.contentContainer, contentContainerStyle]}
        enableOnAndroid={true}
        {...restProps}
      />
    );
  }
}

export const ScrollableAvoidKeyboard = withStyles(
  ScrollableAvoidKeyboardComponent,
  (theme: ThemeType) => ({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
  })
);
