'use strict';
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  TextInput,
  Image,
  Platform
} from 'react-native';

import {Text, H3, Item, Label, Input, Icon} from 'native-base';
import StyleVars from 'Code/Styles/StyleVars';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class AppTextInput extends Component {
  constructor(props) {
    super(props);
  }
  
  focus() {
    this.refs.input.focus();
  }

  _renderIcon(imageSource) {
      return(
        <Image 
        style = {{margin:5}}
        source = { imageSource }/>
      );
  }

  render() {
    
    return (
            <View style = {[Styles.inputView, this.props.viewStyle]}>
                {(this.props.imageSource) ? this._renderIcon(this.props.imageSource) : null}
                <TextInput
                    style = {Styles.smallInput}
                    autoCapitalize={'none'}
                    ref = 'input'
                    autoCorrect = { false }
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    returnKeyType = { this.props.returnKey }
                    returnKeyLabel ={ this.props.returnKey }
                    placeholderTextColor = {StyleVars.Colors.subText}
                    keyboardType={"default"}
                    {...this.props}>
                </TextInput>
            </View>
    );
  }

}

var Styles = {

    inputView: {
        width:windowWidth*0.8,
        borderBottomWidth:1,
        borderBottomColor:StyleVars.Colors.secondary,
        flexDirection:'row',
        marginVertical:windowHeight*0.02
    },


    smallInput:{
        height:(Platform.OS == 'ios') ? windowHeight*0.055 : windowHeight*0.075,
        fontSize:StyleVars.FontSize.normal,
        width:windowWidth*0.70,
        marginLeft:windowWidth*0.03,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText
    }
}