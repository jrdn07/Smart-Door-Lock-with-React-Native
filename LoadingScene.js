import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, Animated} from 'react-native'; 
import Logo from './img/logo.png';
import {Actions} from 'react-native-router-flux';

const switchToAuth = () => {
    Actions.replace('choice');
};

export default class LoadingScene extends Component {
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    }

    componentDidMount() {
        const {LogoAnime, LogoText} = this.state;
        Animated.parallel ([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
		useNativeDriver: false,
            }).start(),
            Animated.timing(LogoText, {
                toValue: 1,
                duration: 1200,
		useNativeDriver: true,
            }),
        ]).start(() => {
            this.setState({
                loadingSpinner: true,
            });

            setTimeout(switchToAuth, 1200);
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.LogoAnime,
                        top: this.state.LogoAnime.interpolate({
                            inputRange: [0, 1],
                            outputRange: [80, 0],
                        }),
                    }}>
                    <Image style={styles.logo} source={Logo} />
                </Animated.View>
                <Animated.View style={{opacity: this.state.LogoText}}>
                    <Text style={styles.logoText}>SmartLock</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5257F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150,
        borderRadius: 10,
    },
    logoText:{
        color: '#FFFFFF',
        fontSize: 35,
        marginTop: 29.1,
        fontWeight: '300',
        fontFamily: 'Pacifico-Regular',
    },
});
