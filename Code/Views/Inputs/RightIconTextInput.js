'use strict';
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import StyleVars from 'Code/Styles/StyleVars';

import {Text, H3, Item, Label, Input, Icon} from 'native-base';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export default class AppTextInput extends Component {
  constructor(props) {
    super(props);
  }
  
  focus() {
    this.refs.input.focus();
  }

  _renderIcon(imageSource) {
      return(
        <TouchableWithoutFeedback onPress = {() => this.props.onIconPress()} >
            <Image 
            style = {Styles.iconStyle}
            source = { imageSource }/>
        </TouchableWithoutFeedback>
      );
  }

  render() {
    return (
            <View style = {[Styles.inputView, this.props.viewStyle]}>
                <TextInput
                    style = {Styles.smallInput}
                    autoCapitalize={'none'}
                    ref = 'input'
                    autoCorrect = { false }
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    returnKeyType = { this.props.returnKey }
                    returnKeyLabel ={ this.props.returnKey }
                    placeholderTextColor = {StyleVars.Colors.subText}
                    placeholder = "Holder"
                    keyboardType={"default"}
                    {...this.props}>
                </TextInput>

                {(this.props.imageSource) ? this._renderIcon(this.props.imageSource) : null}
            </View>
    );
  }

}

var Styles = {

    inputView: {
        width:windowWidth,
        flexDirection:'row',
        marginLeft:windowWidth*0.06
    },


    smallInput:{
        height:windowHeight*0.08,
        fontSize:StyleVars.FontSize.normal,
        width:windowWidth*0.85,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        alignSelf:'center'

    },

    iconStyle: {
        alignSelf:'center'
    }
}