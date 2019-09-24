import React from 'react';
import { Navigation } from 'react-native-navigation';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Layout, Text } from 'react-native-ui-kitten/ui';
import { InputButton, textStyle } from '../../components/common';
import * as counterActions from './../../redux/actions';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';

class HomeComponent extends React.Component {
  state = {
    formData: undefined,
  };

  getDaysInMonth = (year, month) => {
    var names = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    var date = new Date(year, month - 1, 1);
    var result = [];
    while (date.getMonth() == month - 1) {
      result.push({ number: date.getDate(), label: names[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  openModal = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: 'Calendar',
              name: 'Calendar',
              options: {
                animations: {
                  showModal: {
                    alpha: {
                      from: 0,
                      to: 1,
                      duration: 100,
                      startDelay: 0,
                      interpolation: 'accelerate',
                    },
                  },
                  dismissModal: {
                    alpha: {
                      from: 1,
                      to: 0,
                      duration: 100,
                      startDelay: 0,
                      interpolation: 'accelerate',
                    },
                  },
                },
                layout: { backgroundColor: 'rgba(52, 52, 52, 0.5)' },
                screenBackgroundColor: 'rgba(52, 52, 52, 0.5)',
                modalPresentationStyle: 'overCurrentContext',
                // topBar: {
                //   visible: false,
                // },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    const { themedStyle } = this.props;
    // const days = this.getDaysInMonth(2019, 8);
    return (
      <Layout style={themedStyle.container}>
        <InputButton />
        <TouchableOpacity onPress={() => this.openModal()} style={[themedStyle.btnSelectDate]}>
          <Text style={[textStyle.bold, themedStyle.textDate]} status="success" category="h6">
            Fecha para el traslado -
          </Text>
          <Text style={[textStyle.bold, themedStyle.textDate]} status="success" category="h6">
            12/12/2019
          </Text>
        </TouchableOpacity>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.defaultReducer.message,
    count: state.defaultReducer.count,
  };
};

const actions = { ...counterActions };

const HomeComponentRedux = connect(
  mapStateToProps,
  actions
)(HomeComponent);

export const Home = withStyles(HomeComponentRedux, theme => {
  return {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme['background-basic-color-1'],
    },
    textDate: {
      color: theme['color-basic-100'],
    },
    btnSelectDate: {
      flexDirection: 'row',
      top: 10,
      height: 45,
      paddingHorizontal: 10,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: theme['color-primary-600'],
    },
  };
});
