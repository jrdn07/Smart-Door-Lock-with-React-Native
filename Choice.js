import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Actions} from 'react-native-router-flux';
import Animation from 'lottie-react-native';
import anim from './lock-unlocking.json';
import AsyncStorage from '@react-native-community/async-storage';


class Choice extends React.Component {
  componentDidMount() {
    this.animation.play();
  }
  getDataP = async () => {
    try {
      const value = await AsyncStorage.getItem('patternString')
      if(value !== null) {
        console.log("pattern string is "+ value);
      }

    } catch(e) {
      console.log(e);   
    }
  }
  getDataV = async () => {
    try {
      const value = await AsyncStorage.getItem('patternString')
      if(value !== null) {
        console.log("Voice string is" + value);
      }
    } catch(e) {
      console.log(e);   
    }
  }
  func() {
    this.getDataP();
    Actions.pattern();
  }
  func2 () {
    this.getDataV();
    Actions.voicecommand();
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10}}>
          <Text style={styles.heading}>Welcome to your Smart Door Lock System</Text>
          <Text style={styles.heading}>Please select a method to unlock the system</Text>
        </View>
        <Animation
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 350,
            height: 350,
          }}
          loop={true}
          source={anim}
        />
        <View style={styles.rex}>
          <TouchableOpacity style={styles.button} onPress={() => this.func()}>
            <Text style={styles.text}>Pattern</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.func2()}>
            <Text style={styles.text}>Voice</Text>
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  rex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Monserrat-SemiBold',
    margin: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'dodgerblue',
    height: 45,
    width: 100,
    marginLeft: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  button2: {
    backgroundColor: 'dodgerblue',
    height: 45,
    width: 100,
    marginLeft: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  text: {
    color: 'white',
  }
});


export default Choice;

AppRegistry.registerComponent('lottieloader', () => lottieloader);