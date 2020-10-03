import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';

import LoadingScene from './LoadingScene';
import Choice from './Choice';
import Pattern from './Pattern';
import VoiceCommand from './VoiceCommand';
import Home from './Home';
import Toggle from './Toggle';
import VoiceOp from './VoiceOp';
import SetPattern from './SetPattern';
import SetVoice from './SetVoice';
import About from './About';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="loading" component={LoadingScene} initial={true} hideNavBar={true}></Scene>
          <Scene key="choice" component={Choice} hideNavBar={false} title="Choose a Method" ></Scene>
          <Scene key="pattern" component={Pattern} hideNavBar={false} title="Pattern lock" ></Scene>
          <Scene key="voicecommand" component={VoiceCommand} hideNavBar={false} title ="Voice Lock" ></Scene>
          <Scene key="home" component={Home} hideNavBar={false} title="Home Page" ></Scene>
          <Scene key="toggle" component={Toggle} hideNavBar={true} title="Toggle Switch" ></Scene>
          <Scene key="voice" component={VoiceOp} hideNavBar={true} title="Voice Switch" ></Scene>
          <Scene key="SetPattern" component={SetPattern} hideNavBar={false} title="Set Pattern Password" ></Scene>
          <Scene key="SetVoice" component={SetVoice} hideNavBar={false} title="Set Voice Password" ></Scene>
          <Scene key="about" component={About} hideNavBar={false} title="About" ></Scene>
        </Scene>
      </Router>
    );
  }
}