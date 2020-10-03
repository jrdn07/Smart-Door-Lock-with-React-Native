import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,  
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Home extends Component {
    render () {
      return (
        <View style={styles.container}>
        <ImageBackground source={require("./img/bg.png")} style={{flex: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}} >
          <View style={styles.one}>
            <View style={styles.main}>
              <TouchableOpacity style={styles.touchable} onPress={() => Actions.toggle()}>
                <Text style={{color: 'white'}}>Toggle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={() => Actions.voice()}>
                <Text style={{color: 'white'}}>Voice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.two}>
          <TouchableOpacity style={styles.touchable2} onPress={() => Actions.SetPattern()}>
            <Image source={require("./img/p.png")} style={{height: 22, width: 22}} />
            <Text  style={{fontFamily: 'Montserrat-SemiBold', color: 'gray'}}>Set Pattern</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable2} onPress={() => Actions.SetVoice()}>
            <Image source={require("./img/v.png")} style={{height: 24, width: 22}} />
            <Text  style={{fontFamily: 'Montserrat-SemiBold', color: 'gray'}} >Set Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable2} onPress={() => Actions.about()}>
            <Image source={require("./img/a.png")} style={{height: 22, width: 22}} />
            <Text style={{fontFamily: 'Montserrat-SemiBold', color: 'gray'}}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  one: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    backgroundColor: 'rgba(230, 230, 250, 0.7)',
    flexDirection: 'row',
    height: 240,
    width: 280,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  two: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(230, 230, 250, 0.5)',
    borderColor: 'rgb(230,230,250)',
    borderTopWidth: 1,
    shadowColor: '#f98989',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 2,
  },
  touchable: {
    backgroundColor: 'dodgerblue',
    height: 45,
    width: 100,
    margin: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  touchable2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
  }
});

  
export default Home;  
