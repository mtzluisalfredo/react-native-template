import React from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export class AvoidKeyboard extends React.Component {
  static defaultProps = {
    offset: height => height,
    autoDismiss: true,
  };

  translateY = new Animated.Value(0);

  animationDuration = Platform.select({
    android: 160,
    default: 250,
  });

  // @ts-ignore
  showEvent = Platform.select({
    android: 'keyboardDidShow',
    default: 'keyboardWillShow',
  });

  // @ts-ignore
  hideEvent = Platform.select({
    android: 'keyboardDidHide',
    default: 'keyboardWillHide',
  });

  keyboardShowSubscription;
  keyboardHideSubscription;

  componentDidMount() {
    this.keyboardShowSubscription = Keyboard.addListener(this.showEvent, this.onKeyboardShow);
    this.keyboardHideSubscription = Keyboard.addListener(this.hideEvent, this.onKeyboardHide);
  }

  componentWillUnmount() {
    this.keyboardShowSubscription.remove();
    this.keyboardHideSubscription.remove();
  }

  onKeyboardShow = event => {
    const offset = -this.props.offset(event.endCoordinates.height);

    this.createTranslateAnimation({ offset }).start();
  };

  onKeyboardHide = event => {
    const offset = 0;

    this.createTranslateAnimation({ offset }).start();
  };

  onContainerPress = () => {
    Keyboard.dismiss();
  };

  getComponentStyle = source => {
    return {
      ...styles.container,
      ...styles.transform(this.translateY),
      ...StyleSheet.flatten(source),
    };
  };

  createTranslateAnimation = params => {
    const { offset } = params;

    return Animated.timing(this.translateY, {
      toValue: offset,
      duration: this.animationDuration,
      easing: Easing.linear,
    });
  };

  render() {
    const { style, autoDismiss, ...restProps } = this.props;
    const componentStyle = this.getComponentStyle(style);

    return (
      <TouchableWithoutFeedback onPress={this.onContainerPress} disabled={!autoDismiss}>
        <Animated.View style={componentStyle} {...restProps} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // @ts-ignore
  transform: y => ({
    transform: [{ translateY: y }],
  }),
});
