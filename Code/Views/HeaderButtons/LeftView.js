'use strict';

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions
} from 'react-native';

import { Icon,Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import StyleVars from 'Code/Styles/StyleVars';
import Routes from 'Code/Routes/Routes';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default class HeaderLeftView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loader:true,
    }
  }


  _renderTitle() {
    return (
      <View style = {styles.mainView} >
            <Text 
            style = {styles.titleView}
            onPress={() => this.props.navigator._onTitlePress()}
            >Tiranve</Text>
            
        </View>
    );
  }

  _renderBack() {
    return (<TouchableWithoutFeedback onPress = {()=> this.onPress()} >
              <View style = {styles.backButtonView} >
                <Image source={require('Code/Assets/Icons/left-icon.png')}/>
              </View>
          </TouchableWithoutFeedback>);
    
  }

  render() {
    this._showBack = false;

    if(this.props.navigator.getCurrentRoutes().length > 1 ) {
      this._showBack = true;
    } 

    if(this.props.route.name === 'member_list') {
      this._showBack = false;
    }

    return (this._showBack) ? this._renderBack():this._renderTitle();
  }

  onPress() {
      
    if(this.props.route.name === 'settings') {
      this.props.navigator.popToTop(Routes.memberList());
      return true;
    }

    if(this.props.route.name === 'search') {
      this.props.navigator.popToTop(Routes.memberList());
      return true;
    }

    if(this.props.route.name === 'member_show') {
      this.props.navigator.popToTop(Routes.memberList());
      return true;
    }

    this.props.navigator.pop();
    return;
  }


}

const styles = StyleSheet.create({

  mainView: {
    marginLeft:windowWidth*0.03,
    marginTop:windowHeight*0.01
  },

  backButtonView: {
    marginLeft:windowWidth*0.03,
    marginTop:windowHeight*0.001,
    padding:windowWidth*0.05,
    marginBottom:windowWidth*0.07,
  },

  titleView: {
      fontSize:StyleVars.FontSize.title,
      alignSelf:'center',
      fontFamily:StyleVars.Fonts.bold,
      color: StyleVars.Colors.secondary,
      marginLeft:windowWidth*0.03,
  },


  back_button : {
    fontSize:18, 
    paddingTop: 15, 
    paddingLeft: 10, 
  }, 


  user_icon_view: {
      position:'absolute',
      top:(Platform.OS == 'ios')? 22:0,
      right:0,
      left:0,
      backgroundColor:"transparent",
      height:55,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth:0.5,
      borderBottomColor:"#ccc",
      zIndex:(Platform.OS=='ios')?1:0
  },
  
  icon_logo: {
    height: 30,
    width:30,
    marginBottom:5,
    backgroundColor:"transparent"
  },
  
  user_icon_image: {
    height: 30,
    width:30,
    margin:5,
      borderRadius:3
    },
  user_icon_image_container:{
    margin:8,
    marginRight:10,
    height:40,
    width:40
  }
});