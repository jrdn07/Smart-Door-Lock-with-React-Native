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
  SafeAreaView,
  Image
} from 'react-native';
var _ = require('lodash');
import BluetoothSerial from 'react-native-bluetooth-serial'

export default class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      lock: false,
    }
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
    BluetoothSerial.write(code)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
      this.setState({ connected: true, lock: false })
    })
    .catch((err) => console.log(err.message))
  }
  toggleSwitch2(code){
    BluetoothSerial.write(code)
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
      this.setState({ connected: true, lock: true })
    })
    .catch((err) => console.log(err.message))
  }
  render() {
    var styleL;
    var styleU;
      if(!this.state.lock)
      {
        styleL = {
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          marginLeft: 100,
          marginTop: -50,
        }
        styleU = {
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: 'limegreen', 
        }
      }
      else {
        styleL = {
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          marginLeft: 100,
          marginTop: -50,
          backgroundColor: 'red',
        }
        styleU = {
          height: 50,
          width: 50,
          borderRadius: 50,
        }
      }
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
          title=""
          color="black"
        />
        <SafeAreaView style={styles.cont}>
          <FlatList
            data={this.state.devices}
            keyExtractor={item => item.id}
            renderItem={(item) => this._renderItem(item)}
          />
        </SafeAreaView>
        <View style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: 'black',height: 150}}>
        <View style={styles.whole} >
          <View style={styleU}>
            <TouchableOpacity onPress={() => this.toggleSwitch("U")}>
              <Image
                style={{width: 50, height: 50, alignSelf:"center"}}
                source={require('./img/r1.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styleL}>
            <TouchableOpacity onPress={() => this.toggleSwitch2("L")}>
              <Image
                style={{width: 50, height: 50, alignSelf:"center"}}
                source={require('./img/r2.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
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
  whole: {
    width: 150,
    height: 50,
    backgroundColor: 'lavender',
    borderRadius: 40,
  },
  tinyLogo: {
    width: 80,
    height: 40,
    marginLeft: 40,
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
  cont: {
    flex: 1,
    backgroundColor: 'black'
  }
});
