import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { withStyles } from 'react-native-ui-kitten/theme';
import { Layout, Button } from 'react-native-ui-kitten/ui';
import { ActionCreators } from './../../redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var dateNew = new Date('August 28, 2019 23:15:00');
var month = dateNew.getMonth();
var year = dateNew.getFullYear();
var today = dateNew.getDate();

const months = [
  { number: 0, name: 'Enero' },
  { number: 1, name: 'Febrero' },
  { number: 2, name: 'Marzo' },
  { number: 2, name: 'Abril' },
  { number: 2, name: 'Mayo' },
  { number: 2, name: 'Junio' },
  { number: 2, name: 'Julio' },
  { number: 2, name: 'Agosto' },
  { number: 2, name: 'Septiembre' },
  { number: 2, name: 'Octubre' },
  { number: 2, name: 'Noviembre' },
  { number: 2, name: 'Diciembre' },
];

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthState: month,
    };
  }
  componentDidMount() {
    // // this.scrollViewRef.scrollTo({ y: 100, x: 100 });
    // setTimeout(() => {
    //   this.scrollViewRef.scrollTo({ x: 665 });
    // }, 1);
  }
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

  render() {
    const { themedStyle } = this.props;
    const { monthState } = this.state;
    const days = this.getDaysInMonth(2019, monthState + 1);

    const spliceDays = days.splice(today - 1);

    const dayDifference = 6 - spliceDays.length;
    // const luis = Array.from({ length: dayDifference }, (x, i) => {});

    const spliceMonths = months.splice(monthState);
    const renderMonths = spliceMonths.concat(months);
    const monthsNew = months.map(obj => obj.name);

    return (
      <Layout horizontal={true} style={themedStyle.container}>
        <ScrollView
          ref={ref => {
            this.scrollViewRef = ref;
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {renderMonths.map((objMonth, index) => {
            const newYear = monthsNew.includes(objMonth.name) ? year + 1 : year;
            return (
              <Button
                key={index}
                style={themedStyle.btnNameMonth}
                size="medium"
                onPress={() => console.log(objMonth)}
              >
                {objMonth.name + ' ' + newYear}
              </Button>
            );
          })}
        </ScrollView>
        <ScrollView
          ref={ref => {
            this.scrollViewDaysRef = ref;
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {spliceDays.map((objDay, index) => {
            return (
              <Button
                key={index + 'day'}
                appearance="outline"
                textStyle={themedStyle.labelBtnNumberDay}
                style={themedStyle.btnNumberDay}
                onPress={() => console.log(objDay)}
              >
                {objDay.number.toString()}
              </Button>
            );
          })}
        </ScrollView>
        <Button
          size="large"
          style={themedStyle.btnBottom}
          onPress={() => Navigation.dismissModal('Calendar')}
        >
          Aceptar
        </Button>
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

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const CalendarComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarComponent);

export const Calendar = withStyles(CalendarComponentRedux, theme => {
  return {
    container: {
      position: 'absolute',
      bottom: 0,
      height: 200,
      backgroundColor: theme['background-basic-color-1'],
    },
    btnBottom: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    btnNameMonth: {
      height: 20,
      margin: 5,
    },
    btnNumberDay: {
      margin: 5,
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    labelBtnNumberDay: { width: 50, textAlign: 'center' },
  };
});
