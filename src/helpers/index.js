import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  const sizes = [812, 896];

  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (sizes.includes(dimen.height) || sizes.includes(dimen.width))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
