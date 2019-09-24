import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { withStyles } from 'react-native-ui-kitten/theme';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { textStyle } from './style';

// function elevationShadowStyle(elevation) {
//   return {
//     elevation,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 0.5 * elevation },
//     shadowOpacity: 0.3,
//     shadowRadius: 0.8 * elevation,
//   };
// }

class InputButtonComponent extends React.Component {
  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <Layout style={themedStyle.container}>
        <Layout level="2" style={themedStyle.paddingInput}>
          <Text style={textStyle.paragraph} category="p2">
            Origen de viaje
          </Text>
          <TouchableOpacity
            onPress={() => console.log('address one')}
            style={[themedStyle.container, style]}
            {...restProps}
          >
            <Text style={textStyle.bold} status="danger" category="h6">
              Orizaba
            </Text>
          </TouchableOpacity>
        </Layout>
        <Layout level="1" style={{ height: 1 }} />
        <Layout level="2" style={themedStyle.paddingInput}>
          <Text style={textStyle.paragraph} category="p2">
            Lugar de destino
          </Text>
          <TouchableOpacity
            onPress={() => console.log('address Two')}
            style={[themedStyle.container, style]}
            {...restProps}
          >
            <Text style={[textStyle.bold, themedStyle.textDestination]} category="h6">
              Veracruz
            </Text>
          </TouchableOpacity>
        </Layout>
        <TouchableOpacity onPress={() => console.log('hello')} style={themedStyle.btnChangeValues}>
          <Icon name="directions" size={30} color="#c5cee0" />
        </TouchableOpacity>
      </Layout>
    );
  }
}

export const InputButton = withStyles(InputButtonComponent, theme => ({
  // container: {
  //   ...elevationShadowStyle(10),
  // },
  paddingInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textDestination: {
    color: theme['color-success-600'],
  },
  btnChangeValues: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#edf1f7',
    borderColor: '#edf1f7',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
