'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, TouchableOpacity, Text, View } = React;
var moment = require('moment');
var _ = require('lodash');

class Timer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.timeElpased}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._onAction('stop')} style={styles.button}>
            <Text style={{ textAlign: 'center' }}>
              Stop
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this._onAction('start')}
            style={[styles.button, { backgroundColor: '#9ED795' }]}>
            <Text style={{ textAlign: 'center' }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onAction(type) {
    return (ev) => {
      this['_onAction' + _.capitalize(type)](ev);
    };
  }

  _onActionStart(ev) {
    this._startCountingSeconds();
  }

  _onActionStop(ev) {
    clearInterval(this._timer);
    this._timer = null;
  }

  _startCountingSeconds() {
    this._timer = this._timer || setInterval(() => {
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

  _onAction(type, ...rest) {
    return (ev) => {
      this['_onAction' + _.capitalize(type)].apply(this, [ev].concat(rest));
    };
  }

  constructor(props) {
    super(props);
    this.duration = moment.duration();
    this._timer = null;
    this.state = {
      timeElpased: this._formatTime()
    };
  }
};

var styles = StyleSheet.create({
  button: {
    padding: 10,
    fontSize: 20,
    backgroundColor: '#E4555F',
  },
  buttonContainer: {
    width: 100,
    margin: 5
  },
  container: {
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
