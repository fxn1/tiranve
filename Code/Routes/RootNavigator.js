'use strict';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  BackHandler,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';
import { Container, StyleProvider } from 'native-base';
import getTheme from 'Tiranve/native-base-theme/components';
import styles from 'Code/Styles/NavigatorStyles';
import Routes from 'Code/Routes/Routes';

var routeData = null;
var navigatorObj = null;

const NavigationBarRouteMapper = {

    LeftButton: function (route, navigator, index, navState) {
      return route.leftButton ? (
          <route.leftButton
            style = { styles.buttonStyle }
            navigator = { navigator }
            route ={ route }
          />
       ):null;
    },

    Title: function (route, navigator, index, navState)  {
      return route.title ? (
          <Text 
              style = {[styles.titleStyle, styles.navBArTitleText, Platform.OS == 'android' ? {paddingRight:100}:null ]}
              numberOfLine = {1} >{route.title}
           </Text> ):null;
    },

    RightButton: function (route, navigator, index, navState)  {

       return route.rightButton ? (
          <route.rightButton
            style = { styles.buttonStyle }
            navigator = { navigator }
            route ={ route }
          />

       ):null;
    }
}

export default class RootNavigator extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { hideNavigationBar: false };
  }

  componentDidMount() {
    this._setupRoute(this._getInitialRoute());
    if(Platform.OS == 'android'){
        this.setupAndroidBackListener();
    }
  }

  setupAndroidBackListener(){
       BackHandler.addEventListener("hardwareBackPress", () => {
        if (this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
        }
        return true;
    });
  }

  componentWillUnmount() {
    if (this._listeners)
      this._listeners.forEach((listener) => listener.remove());
  }

  onNavWillFocus(route) {
    this._setupRoute(route.currentTarget.currentRoute);
  }

  render () {
    let NavigationBar = (
        <Navigator.NavigationBar
          routeMapper = { NavigationBarRouteMapper }
          style = { styles.navBar } />
      );
  
      return (
         <Navigator
           ref = { (navigator) =>  this._setNavigatorRef(navigator) }
           initialRoute = { this._getInitialRoute() }
           renderScene = { (route, navigator) => this._renderScene(route, navigator)}
           navigationBar = {this.state.hideNavigationBar ? null : NavigationBar}
           configureScene = {(route, routeStack) => this._setupConfig(route, routeStack)}
         />
      )
    
  }

  _renderScene(route, navigator) {
    let style = route.hideNavigationBar ? { paddingTop: 0 } : {};
    return (
        <Container>
          <StatusBar
            barStyle="light-content"
          />
          <View style={[styles.sceneContainer, style]}>
            <StyleProvider style={getTheme()} > 
                <route.component
                      {...route.passProps}
                      navigator={navigator}
                      back={() => this.back()}
                      backToHome={() => this.backToHome()}
                      toRoute={(route, args) => this.toRoute(route, args, navigator)}
                      replaceRoute={(route, args) => this.replaceRoute(route, args, navigator)}
                      resetRoute = { (route, args) => this._toRouteWithbackDisable(route, args, navigator )}
                      routeData = { routeData }
                />
            </StyleProvider>
        </View>
      </Container>
    )
  }


  back() {
    this.navigator.pop();
  }

  backToHome() {
    this.navigator.popToTop();
  }

  toRoute(route, args, navigator) {

    if(!this.navigator) {
      this.navigator = navigator
    }

    routeData = args;

    if ("string" != typeof route || (route = Routes.get(route, args))) {
     this.navigator.push(route);
    }
  }

  replaceRoute(route, args) {
    routeData = args;
    if ("string" != typeof route || (route = Routes.get(route, args))) {
      this.navigator.replace(route);
    }
  }

  _getInitialRoute() {
    return Routes.login();
  }

 _setNavigatorRef(navigator) {

    if(!navigator) {
      this.navigator = navigatorObj;
    }

    if (navigator !== this.navigator) {
      this.navigator = navigator;

      if (navigator) {
        this._listeners = [
          navigator.navigationContext.addListener("willfocus", this.onNavWillFocus.bind(this))
        ];
      } else {
        if (this._listeners)
          this._listeners.forEach((listener) => listener.remove());
      }
    }
  }

  _toRouteWithbackDisable(route, args, navigator ) {
     if(!args){
      args = {};
    }
     if(!this.navigator) {
      this.navigator = navigator
    }
   routeData = args;
    
    if ("string" != typeof route || (route = Routes.get(route, args))) {
      this.navigator.resetTo(route);
    }
  }

  _setupRoute(route) {
    if (route) {

      let state = {};
      
      if (route.hideNavigationBar !== undefined && this.state.hideNavigationBar !== route.hideNavigationBar)
        state.hideNavigationBar = route.hideNavigationBar;

      if (route.statusBarStyle && this.state.statusBarStyle !== route.statusBarStyle) {
        state.statusBarStyle = route.statusBarStyle;
        StatusBar.setBarStyle(route.statusBarStyle, true);
        StatusBar.setHidden(false, "slide");
      }

      this.setState(state);
    }
  }

  _setupConfig(route, routeStack) {
      if(route.viewFlow) {
        return ({ 
                ...route.viewFlow,
           });
      }
      return Navigator.SceneConfigs.PushFromRight;
  }

 }
