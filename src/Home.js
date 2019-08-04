import React, { Component } from 'react';
import {
  // Text,
  StatusBar,
  View,
  // ScrollView,
  // SafeAreaView,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './redux/action';
// import { Card } from './components';
// import Cards from './data';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class Home extends Component {
  componentWillMount() {
    this.scrollY = new Animated.Value(0);

    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS === 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: 'clamp',
    });

    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    this.animatedTagTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: 'clamp',
    });
    this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [50, 30],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    const { triggerDefault } = this.props;
    triggerDefault();
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'toggleDrawer') {
      Navigation.mergeOptions('SideDrawer', {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }

  goDetail = (item, index) => {
    const { componentId } = this.props;

    Navigation.push(componentId, {
      component: {
        name: 'Detail',
        passProps: {
          item,
          index,
        },
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      // <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f1f8' }}>
      //   <View style={{ flex: 1 }}>
      //     <ScrollView
      //       scrollEventThrottle={16}
      //       onScroll={Animated.event([
      //         { nativeEvent: { contentOffset: { y: this.scrollY } } },
      //       ])}
      //     >
      //       <View style={{ flex: 1, marginBottom: 20 }}>
      //         <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      //           <Text style={{ fontSize: 24, fontWeight: '700' }}>
      //             Oportunides para invertir
      //           </Text>
      //           {Cards.map((item, index) => (
      //             <Card
      //               key={`${index.toString()}`}
      //               item={item}
      //               index={index}
      //               goDetail={() => this.goDetail()}
      //             />
      //           ))}
      //         </View>
      //       </View>
      //     </ScrollView>
      //   </View>
      // </SafeAreaView>
    );
  }
}

Home.propTypes = {
  componentId: PropTypes.string,
  triggerDefault: PropTypes.func,
};

Home.defaultProps = {};

Home.options = () => {
  return {
    layout: {
      backgroundColor: '#F7F8F8',
    },
    topBar: {
      elevation: 0,
      drawBehind: false,
      noBorder: true,
      background: { color: '#f0f1f8' },
    },
  };
};

const mapStateToProps = state => {
  return {
    message: state.defaultReducer.message,
    count: state.defaultReducer.count,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
