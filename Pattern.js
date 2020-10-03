import * as React from 'react';
import { ToastAndroid } from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';

var password1 = "123";

class Pattern extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          message: 'Please input your password.',
          status: 'normal',
          passString: '',
      }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('patternString')
      if(value !== null) {
        this.setState ({ passString: value });
      }
      else {
        this.setState ({ passString: password1 })
      }
    } catch(e) {
      console.log(e);   
    }
  }
  
  onEnd(password) {
    if (password == this.state.passString ) {
        this.setState({
            status: 'right',
            message: 'Password is right, success.'
        });
        ToastAndroid.show('Password was right ' , ToastAndroid.SHORT); 
        Actions.home();                
    } else {
        this.setState({
            status: 'wrong',
            message: 'Password is wrong, try again.'
        });
    }
}

  onStart() {
  this.getData();
  this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  onReset() {
      this.setState({
          status: 'normal',
          message: 'Please input your password (again).'
      });
  }

  render() {
      return (
          <PasswordGesture
              ref='pg'
              status={this.state.status}
              message={this.state.message}
              onStart={() => this.onStart()}
              onEnd={(password) => this.onEnd(password)}
              innerCircle={true}
              outerCircle={false}
          />
      );
  }
}

export default Pattern;