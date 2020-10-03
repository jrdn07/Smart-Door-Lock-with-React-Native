import React, { Component } from 'react'
import { Text, View, StyleSheet,Image } from 'react-native'

export default class About extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Image source={require("./img/logo.png")} style={{width: 80, height: 80}}/>
                    <View style={{height: 50, borderColor: 'black', borderWidth: 1}}></View>
                    <Text style={{fontFamily: 'Pacifico-Regular', fontSize: 40, marginLeft: 13}}>SmartLock</Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.para}>
                        <Text style={{fontSize:20, fontFamily: 'Montserrat-Light', margin: 7, textAlign: 'center'}}>The smart door 
                        locking app helps you to secure your house and control the locking and unlocking of your doors with a click. 
                        There is no more need to get up to unlock the door everytime someone comes. Just connect your app to the 
                        door using Bluetooth and then open the door for as long as you desire or on the click of a button.</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor: 'aliceblue',
    },
    head: {
        marginTop: 35,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 7,
        marginTop: 70,
        alignItems: 'center',
    },
    para: {
        height: 400,
        width: 300,
    }
}); 
