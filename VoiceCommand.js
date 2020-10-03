import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  AppRegistry,
  ToastAndroid,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {Actions} from 'react-native-router-flux';
import Animation from 'lottie-react-native';
import anim from './aispeech-mic.json';
import AsyncStorage from '@react-native-community/async-storage';

var password = "hello there";

class VoiceCommand extends Component {
  state = {
    result: '',
  };

  constructor(props) {
    super(props);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }
  componentDidMount() {
    this.animation.play();
    this.getData();
  }

  UNSAFE_componentWillMount(){
    Voice.destroy().then(Voice.removeAllListeners);
  }


  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('voiceString')
      if(value !== null) {
        password = value;
      }
    } catch(e) {
      console.log(e);   
    }
  }


  onSpeechPartialResults = e => {
    this.setState({result: e.value});
    if(e.value == password)
    {
      ToastAndroid.show('Password was right ' , ToastAndroid.SHORT);
      Actions.home();
    }
  }



  _startRecognizing = async () => {
    this.setState({
      result: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Give the secret voice command to pass the security
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 240,}}>
            <Text style={styles.instructions}>
              Press mic to start Recognition
            </Text>          
            <TouchableHighlight
              onPress={this._startRecognizing}
              style={{ marginVertical: 20 }}>
              <Animation
                ref={animation => {
                this.animation = animation;
                }}
                style={{
                width: 180,
                height: 180
                }}
                loop={true}
                source={anim}
              />
            </TouchableHighlight>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                marginBottom: 1,
                fontWeight: '700',
              }}>
              Command Stated
            </Text>
            <Text style={{margin: 15, fontFamily: 'Montserrat-Light', color: 'white',}}>{this.state.result}</Text>  
          </View>          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('lottieloader', () => lottieloader);
export default VoiceCommand;

