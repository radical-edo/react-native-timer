'use strict';

import React from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import AudioPlayer from 'react-native-audioplayer';

const { AppRegistry, StyleSheet, TouchableOpacity, Text, TextInput, View } = React;

const PERIODS_MAP = {
  training: 'rest',
  rest: 'training'
};

class Timer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.timeElpased}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._onAction('pause')} style={[styles.button, { backgroundColor: '#FFFF8F' }]}>
            <Text style={{ textAlign: 'center' }}>
              Pause
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this._onAction('start')}
            style={[styles.button, { backgroundColor: '#9ED795' }]}>
            <Text style={{ textAlign: 'center' }}>
              {this.state.startText}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._onAction('reset')} style={styles.button}>
            <Text style={{ textAlign: 'center' }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            keyboardType="numeric"
            placeholder="Training period"
            value={this.state.periods.training}
            onChangeText={this._onAction('changePeriod', 'training')}>
          </TextInput>
          <TextInput
            keyboardType="numeric"
            placeholder="Rest period"
            value={this.state.periods.rest}
            onChangeText={this._onAction('changePeriod', 'rest')}>
          </TextInput>
        </View>
        <View>
          <Text>{this.state.notification}</Text>
        </View>
      </View>
    );
  }

  _onActionReset() {
    this._onActionPause();
    this.duration = moment.duration();
    this._periodEnd = null;
    this.setState(_.omit(this._getInitialState(), 'periods'));
  }

  _onActionChangePeriod(input, name) {
    this.state.periods[name] = Number(input);
    this.setState(this.state);
  }

  _onActionStart(ev) {
    this.setState({
      startText: 'Resume'
    });
    this._startCountingSeconds();
    this._initNotifications();
  }

  _startCountingSeconds() {
    this._timer = this._timer || setInterval(() => {
      this._secondHasPassed();
    }, 1000);
  }

  _secondHasPassed() {
    this.duration.add(1, 'second');
    if (0 == this.duration.as('seconds') % this._periodEnd) {
      AudioPlayer.play('ding');
      this._currentPeriod = this._getNextPeriod();
      this._periodEnd += this.state.periods[this._currentPeriod];
    }
    this.setState({
      timeElpased: this._formatTime()
    });
  }

  _getNextPeriod() {
    return PERIODS_MAP[this._currentPeriod];
  }

  _initNotifications() {
    this._periodEnd = this._periodEnd || this.state.periods.training;
    this._currentPeriod = this._currentPeriod || 'training';
  }

  _onActionPause(ev) {
    clearInterval(this._timer);
    this._timer = null;
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
    this.state = this._getInitialState();
  }

  _getInitialState() {
    return {
      startText: 'Start',
      timeElpased: this._formatTime(),
      notification: '',
      periods: {
        training: 0,
        rest: 0
      }
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
