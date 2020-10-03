import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  Image,
  SafeAreaView
} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'
import Voice from '@react-native-community/voice';

export default class VoiceOp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      result: "switch on for x seconds",
      listeningState: "not started",
      audioLevel: 0,
      text: '',
      dev: '',
    }
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

    this.count = 0
  }

  UNSAFE_componentWillMount(){
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
      this.setState({ isEnabled, devices })
    })

    BluetoothSerial.on('bluetoothEnabled', () => {

      Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ])
      .then((values) => {
        const [ isEnabled, devices ] = values
        this.setState({  devices })
      })

      BluetoothSerial.on('bluetoothDisabled', () => {

         this.setState({ devices: [] })

      })
      BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

    })
    Voice.destroy().then(Voice.removeAllListeners);

  }

  onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
  };

  onSpeechEnd = e => {
    //console.log("i am here");
  };

  onSpeechResults = e => { 
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
      const count = 0
      const text = e.value;
      this.setState({ result: text });
      var r = text.toString();
      if(this.count == 0){
        if ((r.indexOf("switch") >= 0) && (r.indexOf(" on ") >= 0) && (r.split(' ').length >= 4)){
          var thenum = r.match(/\d/g);
          thenum = thenum.join("");
          console.log(thenum);
          if(thenum.length == 1 || thenum.length ==2){
            const switchOffTime = parseInt(thenum);
            switch(switchOffTime){
              case 5: this.toggleSwitch("A");
                  break;
              case 10: this.toggleSwitch("B");
                  break;
              case 15: this.toggleSwitch("C") ;
                  break;
              case 20: this.toggleSwitch("D");
                  break;
              case 25: this.toggleSwitch("E");
                  break;
              case 30: this.toggleSwitch("F");
                  break;
            }
          }

          this.count = this.count + 1
        }
      }
  }

  _startRecognizing = async () => {    
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
    }
  };

  _adFailed(error){
    console.log(error);
  }
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);

      ToastAndroid.show(`Connected to device ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }
  _renderItem(item){

    return(<TouchableOpacity onPress={() => this.connect(item.item)}>
            <View style={styles.deviceNameWrap}>
              <Text style={styles.deviceName}>{ item.item.name ? item.item.name : item.item.id }</Text>
            </View>
          </TouchableOpacity>)
  }
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }
  discoverAvailableDevices () {
    console.log("discovering");
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
        console.log(uniqueDevices);
        this.setState({ unpairedDevices: uniqueDevices, discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }
  toggleSwitch(code){
    console.log(code + "-------");
    BluetoothSerial.write(code)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
      this.setState({ connected: true })
    })
    .catch((err) => console.log(err.message))
  }

  render() {

    return (
      <View style={styles.container}>
      <View style={styles.toolbar}>
            <Image
              style={styles.tinyLogo}
              source={require('./img/bt.png')}
            />
            <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
            <View style={styles.toolbarButton}>
              <Switch
                value={this.state.isEnabled}
                onValueChange={(val) => this.toggleBluetooth(val)}
              />
            </View>
      </View>
        <Button
          onPress={this.discoverAvailableDevices.bind(this)}
          title= ""
          color= "black"
        />
        <FlatList
          style={{flex:1, backgroundColor: 'black'}}
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={(item) => this._renderItem(item)}
        />

       <View style={{ backgroundColor: 'black'}}>
         <Text style={{ fontSize:15, alignSelf: "center", color: 'white'}}>Message Sent :</Text>
         <Text style={{ fontSize:20, color: "black", fontWeight: "bold", textAlign: "center", color: 'white'}}>{this.state.result}</Text>
         <TouchableOpacity onPress={this._startRecognizing}>
          <Image
            style={{width: 100, height: 100, alignSelf:"center"}}
            source={require('./img/button.png')}
          />
        </TouchableOpacity>
       </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    paddingTop:30,
    paddingBottom:30,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
  toolbarTitle:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    flex:1,
    marginTop:6,
    marginLeft: -70
  },
  deviceName: {
    marginLeft: 10,
    fontSize: 30,
    color: "lightgray",
    fontFamily: 'Ubuntu-Medium'
  },
  deviceNameWrap: {
    borderWidth: 1,
    borderRadius: 7,
  },
  tinyLogo: {
    width: 80,
    height: 40,
    marginLeft: 40,
  },
});
