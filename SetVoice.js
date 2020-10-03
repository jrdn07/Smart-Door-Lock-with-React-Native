import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableHighlight,
  ToastAndroid,
  AppRegistry,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

var password = "";

class SetVoice extends Component {
  state = {
    result: '',
  };

  constructor(props) {
    super(props);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }
  ComponentDidMount () {
    this.setState({result: ''});
  }
  UNSAFE_componentWillMount(){
    Voice.destroy().then(Voice.removeAllListeners);
  }

  storeData = async (value) => {
    try {
        await AsyncStorage.setItem('voiceString', value)
        }  catch (e) {
        console.log(e);
    }
  }

  onSpeechPartialResults = e => {
    this.setState({ result: e.value })
    const text = this.state.result;
    var rex = text.toString();
    password = rex;
    console.log(rex);
  };


  startLis = async () => {
    this.setState({
      result: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
    }
  };

  func () {
    ToastAndroid.show("Password Saved Successfuly !!!! Kindly Login again", ToastAndroid.SHORT);
    this.storeData(password);
    Actions.choice();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.cont}>
          <Text style={styles.wel}>
            Set Your New Secret Voice Command
          </Text>
          <View style={{justifyContent: 'center',  marginTop: 170, alignItems: 'center',}}>
            <Text style={styles.inst}>
              Press mic to start Recognition
            </Text>          
            <TouchableHighlight
              onPress={this.startLis}
              style={{ marginVertical: 20 }}>
              <Image source={require("./img/mic.png")} style={{width: 140, height: 200}}/>
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
            <Button title="Save Voice Password" onPress={()=> this.func()}></Button>
          </View>          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
  },
  wel: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  inst: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

export default SetVoice;
