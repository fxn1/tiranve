'use strict';
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;


export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this._source = {uri:'https://via.placeholder.com/350x150?text=profile'};

  }

  componentWillMount() {
    this._source = {
        uri:this.props.imageSourceUri
    }
  }

  focus() {
    this.refs.input._root.focus();
  }

   selectImage() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return false;
            } else if (response.error) {
                return false;
            } else if (response.customButton) {
                return false;
            } else {

                let response64Image = "data:image/png;base64," + response.data;
                this._source = {uri: response64Image, isStatic: true};

                if(this.props.onSelect) {
                    this.props.onSelect(response);
                }

                this.setState({loadingView:false});

            }

        });
    }





  render() {
    return (
        <View style = {Styles.container}>
                <Text style = {Styles.label} > {this.props.label} </Text>
                    <TouchableWithoutFeedback onPress = {() =>  this.selectImage()} >
                        <ImageBackground
                            source={this._source}
                            style = {Styles.imageBackgroundContainer}
                            imageStyle = {[Styles.imageStyle, this.props.imageStyle]}>
                            <TouchableWithoutFeedback onPress = {() =>  this.selectImage()} >
                            <Image 
                                style = {[Styles.cameraImage, this.props.cameraStyle]} 
                                source = { require('Code/Assets/Icons/camera-icon.png') }/>
                            </TouchableWithoutFeedback>

                        </ImageBackground>
                    </TouchableWithoutFeedback>
        </View>
    );
  }

}

const Styles = {

    container:{
        paddingLeft:5, 
        height:( windowWidth / 13) * 4,
        marginTop:10,
        flex:1
    },

    label: {
        alignSelf:'center',
        fontSize:14,
        fontWeight:'100',
        marginTop:1,
        marginBottom:5,
        color:'#000',
        marginLeft:50
    },

    imageStyle: {
        height:( windowWidth / 13) * 4,
        width: (windowWidth / 13) * 4,
        borderRadius:( windowWidth / 13) * 2,
        alignSelf:'center',  
    },

    imageBackgroundContainer: {
        height:( windowWidth / 10) * 4,
        width: (windowWidth / 10) * 4,
        alignSelf:'center'
    },

    cameraImage: {
        width:30, 
        height:30, 
        alignSelf:'center', 
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        marginRight:20
    }

    
}