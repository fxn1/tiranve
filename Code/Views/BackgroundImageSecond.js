import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
} from 'react-native';

const remote = '';

export default class BackgroundImageSecond extends Component {
  
render() {
    const resizeMode = 'center';
    const text = 'I am some centered text';
    
    return (  
      <View style={{position: 'absolute', top: 0, bottom: 400, left: 0, right: 0, backgroundColor:'#fff'}} >
            <Text></Text>
            
      </View>
    );
  }
}