import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';

import StyleVars from 'Code/Styles/StyleVars';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class BackgroundImage extends Component {
  
render() {
    return (  

      <View style={Styles.container} >
        <View style = {Styles.topBox} />
        <Text style = {Styles.titleView}  >Tiranve</Text>
        <Image 
            style = {Styles.logo} 
            source = {require('Code/Assets/logo.png')}/>
      </View>
    );
  }
}

const Styles = {

 container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
 },

 topBox: {
    position: 'absolute',
    top: 0,
    bottom: windowHeight*0.62,
    left: 0,
    right: 0,
    backgroundColor:StyleVars.Colors.secondary
 },

 titleView:{
    top:windowHeight*0.12,
    alignSelf:'center',
    fontSize:StyleVars.FontSize.appName,
    fontFamily:StyleVars.Fonts.bold,
    color:'#fff'
 },

 logo:{
    position: 'absolute',
    bottom:windowHeight*0.08, 
    alignSelf:'center',
    width:windowWidth*0.5
 }
}