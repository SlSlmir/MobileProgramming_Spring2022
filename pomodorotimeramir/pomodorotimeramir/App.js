import React from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Slider } from 'react-native';
import Counter from './components/Counter';


export default class App extends React.Component {

  constructor () {
    super();
    // время работы и отдыха
    this.longTime = 1/6;
    this.shortTime = 1/12;

    // в секунды
    this.calculateCycles();

    this.isPaused = false;

    this.state = {
      count: this.longCycle,
      isLongCycle: true,
      isChangeTimeOn: false
    }

  }

  calculateCycles () {
    this.longCycle = this.longTime * 60;
    this.shortCycle = this.shortTime * 60;
  }

  countDown () {

    this.countDownInterval = setInterval(() => {

      if (this.isPaused) {
        return;
      }
       
        this.setState(
          (prevState) => {
  
            let nextTime = --prevState.count;
            let nextCycle = prevState.isLongCycle;
  
            if (nextTime === 0) {
  
  
              // новый цикл
              if (prevState.isLongCycle) {
                nextTime = this.shortCycle;
                nextCycle = false;
              } else {
                nextTime = this.longCycle;
                nextCycle = true;
              }
            }
            
            return { count:  nextTime, isLongCycle: nextCycle }
          }
        );
     
    }, 1000);
  }

  parseTime = (seconds) => {
    const _minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const _seconds = (seconds % 60).toString().padStart(2, '0');
    return `${_minutes}:${_seconds}`;
  }

  stopCount = () => {
    this.isPaused = true;
  }

  startCount = () => {
    this.isPaused = false;
    this.setState({isChangeTimeOn: false});

    if (typeof this.countDownInterval === 'undefined') {
      this.countDown();
    }
    
  }

  resetCount = () => {
    this.isPaused = true;
    this.setState((prevState) => {
        return {
          count: (prevState.isLongCycle ? this.longCycle : this.shortCycle)
        }
    });
  }



  render() {
    const { isLongCycle, isChangeTimeOn } = this.state;

    return (
      <View style={[styles.container, (isLongCycle ? styles.longBg : styles.shortBg)]}>
        <Text style={styles.legend}>{this.state.isLongCycle ? 'It\'s work time!' : 'Let\'s rest...'}</Text>
        <Counter count={this.parseTime(this.state.count)} />
          <View style={styles.menu}>
            <Button style={styles.button} title={'Start'} color={'#26a65b'} onPress={this.startCount}></Button>
            <Button style={styles.button} title={'Stop'} onPress={this.stopCount}></Button>
            <Button style={styles.button} title={'Reset'} color={'#f7ca18'} onPress={this.resetCount}></Button>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    color: '#fff'
  },
  longBg: {
    backgroundColor: 'black',
  },
  shortBg: {
    backgroundColor: 'black',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    padding: 5,
  }
});
