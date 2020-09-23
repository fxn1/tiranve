'use strict';
import React, {Component} from 'react';
import { Icon,Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import Routes from 'Code/Routes/Routes';
import AuthUser from 'Code/Classes/AuthUser';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;



export default class HeaderRightView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loader:true,
    }
    this.authUser = null;
  }


  componentWillMount(){
    this._fetchUser();
  }

  async _fetchUser() {
    this.authUser = await AuthUser.get();
    this.setState({loadingView:false});
    return this.authUser;
  }

  _goToSettings() {
    if(this.props.route.name != 'settings') {
      this.props.navigator.push(Routes.settings());
    }
  }

  async _goToProfile() {

    if(global.showAuthProfile) {
      return false;
    }

    if(this.authUser) {
        global.memberID = this.authUser.id;
        global.showAuthProfile = true;
        this.props.navigator.push(Routes.memberShow());
        return;
    } 
    this.props.navigator.push(Routes.memberProfile());
    return;
  }

  _searchInList() {
      if(this.props.route.name != 'search') {
        this.props.navigator.push(Routes.search());
      }
  }


  _renderDefaultProfileImage() {
    return (
        <TouchableWithoutFeedback onPress = {()=> this._goToProfile()} >
            <View style =  {styles.iconView}>
              <Image source={require('Code/Assets/user.png')}/>
            </View>
        </TouchableWithoutFeedback>
    );
  }

  _renderProfileImage() {

    if(!this.authUser || !this.authUser.profile_image) {
      return this._renderDefaultProfileImage();
    }
    return (
        <TouchableWithoutFeedback onPress = {()=> this._goToProfile()} >
            <View style =  {styles.iconView}>
              <Image style = {{height:30, width:30, borderRadius:15}} source={{uri:this.authUser.profile_image}}/>
            </View>
        </TouchableWithoutFeedback>
    );
  }




  render() {
    return (
        <View style = {styles.mainView} >
            <TouchableWithoutFeedback onPress = {()=> this._searchInList()} >
                <View style =  {[styles.iconView]}>
                    <Icon name = "search" />
                </View>
            </TouchableWithoutFeedback>

            {this._renderProfileImage()}

            <View >
                <TouchableWithoutFeedback onPress = {()=> this._goToSettings()} >
                <View style =  {styles.iconView}>
                    <Image source={require('Code/Assets/menu.png')}/>
                  </View>
                </TouchableWithoutFeedback>
               
            </View>
        </View>
        
    );
  }


}

const styles = StyleSheet.create({

  mainView: {
    marginLeft:windowWidth*0.03,
    marginTop:windowHeight*0.006,
    flexDirection:'row',
    marginRight:windowWidth*0.02,

  },

  iconView:{
    margin:1,
    paddingTop:windowWidth*0.017,
    paddingLeft:windowWidth*0.017,
    paddingRight:windowWidth*0.017,
    marginBottom:3
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