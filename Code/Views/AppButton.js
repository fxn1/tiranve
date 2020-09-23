'use strict';
import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
  
} from 'react-native';

import StyleVars from 'Code/Styles/StyleVars';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    gradient:{
       paddingVertical: windowHeight*.0211,
       paddingHorizontal: windowWidth*.0211,
       width:windowWidth*0.55,
       marginVertical:5,
       borderColor: StyleVars.Colors.secondary,
       backgroundColor: StyleVars.Colors.secondary,
       borderWidth: 1,
       borderBottomWidth: 2,
       borderRadius: 100,
       alignSelf:'center',
    },
    left_remove: {
       left:0
    },
    buttonText: {
      color: StyleVars.Colors.fontColor,
      fontSize:StyleVars.FontSize.normal,
      fontStyle:'normal',
      textAlign:'center',
      fontFamily:StyleVars.Fonts.regular,
    },
});

class Button extends React.Component {
  render() {
    return (
    <TouchableOpacity
        style={[styles.gradient, this.props.style]}
        onPress ={() => this.onPress()}>   
        <Text allowFontScaling={true} style={[styles.buttonText, this.props.textStyle]}> {this.props.text} </Text> 
    </TouchableOpacity>
    );
  }

  onPress() {
    if (this.props.enabled) {
       this.props.onPress();
    }
  }
}

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default Button;