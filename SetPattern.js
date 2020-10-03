import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordGesture from 'react-native-gesture-password';
import { Actions } from 'react-native-router-flux'


var Password1 = '';

class SetPattern extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    storeData = async (value) => {
        try {
        await AsyncStorage.setItem('patternString', value)
        }  catch (e) {
        console.log(e);
        }
    }

    onEnd(password) {
        if ( Password1 === '' ) {
            Password1 = password;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + password
                });
                Password1 = "";
                this.storeData(password);
                ToastAndroid.show('Password Saved Successfuly, Kindly Login Again ' , ToastAndroid.SHORT); 
                Actions.choice();
            } else {
                this.setState({
                    status: 'wrong',
                    message:  'Not the same, try again.'
                });
            }
        }
    }

    onStart() {
        if ( Password1 === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
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
export default SetPattern;

AppRegistry.registerComponent('SetP', () => SetP);