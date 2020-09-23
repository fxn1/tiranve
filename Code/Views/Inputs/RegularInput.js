'use strict';
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  TextInput
} from 'react-native';

import {Text, H3, Item, Label, Input} from 'native-base';
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
import StyleVars from 'Code/Styles/StyleVars';

export default class RegularInput extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._background = 'transparent';
    if(this.props.editable == false) {
        this._background = '#ECEAED';
    }
    
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    this.componentWillMount();
    return (
            <View style = {Styles.mainView} >
                { (this.props.label) ? <Text style = {Styles.label} >{this.props.label}</Text>:null }
                   
                    <View regular style = {{...Styles.smallItem, backgroundColor: this._background, ...this.props.inputViewStyle}} >
                            <TextInput style = {{...Styles.smallInput, ...this.props.inputStyle}}
                                autoCapitalize={'none'}
                                ref = 'input'
                                autoCorrect = { false }
                                underlineColorAndroid = 'rgba(0,0,0,0)'
                                returnKeyType = { this.props.returnKey }
                                returnKeyLabel = { this.props.returnKey }
                                placeholderTextColor = {StyleVars.Colors.subText}
                                keyboardType={"default"}
                                {...this.props}
                            />
                    </View>
            </View>
    );
  }

}

var Styles = {
    mainView:{
        marginTop:windowHeight*0.02
    },
    smallItem: {
        marginHorizontal:windowWidth*0.03,
        borderRadius:5,
        borderColor:StyleVars.Colors.seconday,
        borderWidth:1,
        width:windowWidth*0.9,
    },

    smallInput:{
        height:windowHeight*0.065,
        fontSize:StyleVars.FontSize.normal,
        width:windowWidth*0.70,
        marginLeft:windowWidth*0.02,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,

    },

    label: {
        fontSize:StyleVars.FontSize.smallTextSecondary,
        fontFamily:StyleVars.Fonts.regular,
        color:StyleVars.Colors.primaryText,
        marginLeft:windowWidth*0.05,
    },
}