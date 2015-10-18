'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, TouchableOpacity, Text, View } = React;
var moment = require('moment');

class Timer extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {this.state.timeElpased}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    this._startCountingSeconds();
  }

  _startCountingSeconds() {
    setInterval(() => {
      this._secondHasPassed();
    }, 1000);
  }

  _secondHasPassed() {
    this.duration.add(1, 'second');
    this.setState({
      timeElpased: this._formatTime()
    });
  }

  _formatTime() {
    return `${this.duration.minutes()} : ${this.duration.seconds()}`;
  }

  constructor(props) {
    super(props);
    this.duration = moment.duration();
    this.state = {
      timeElpased: this._formatTime()
    };
  }
};

var styles = StyleSheet.create({
  button: {
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('timer', () => Timer);
