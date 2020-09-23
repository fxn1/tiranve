'use strict';
import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/Login';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';

import DataStore from 'Code/DataStores/CommonDataStore';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';
import AccessToken from 'Code/Classes/AccessToken';
import AuthUser from '../../Classes/AuthUser';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            loadingView: true,
            error:null,
        };

        this.email = '';
        this.password = '';
    }

    componentWillMount() {
        this._checkLogin();
        this._setupListeners();
    }

    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
        this._listeners[this._listeners.length]= Actions.login.failed.listen(this._onLoadUserFailed.bind(this));
    }

    _validate() {
        let email = this.email;
        let password = this.password;
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let result = {
            error: false,
            message:''
        };

        if(!email || !password) {
            result.error = true;
            result.message = 'All fields are required to login';
            return result;
        }

        if(!emailPattern.test(email)) {
            result.error = true;
            result.message = 'Please check if the email id is correct';
            return result;
        }

        return result;
    }

    _loginUser() {
        this.state.error = null;
        let validator = this._validate();
        if(validator.error){
            this.setState({error:validator.message});
            return false;
        }
 
        this.setState({loadingView:true});
        Actions.login({
            email: this.email,
            password: this.password
        });

        return true;
    }

    async _checkLogin() {
        
        try {
          let user =  await AuthUser.getUser();
          let token = await AccessToken.get();
          this.state.loadingView = false;
          if(!token) {
            this.setState({showView:true, loadingView:false});
            return false;
          }
          this.setState({showView:false, loadingView:false});
          this._onLoadUserCompleted({}, {});
        } catch(err) {
            this.setState({showView:true, loadingView:false});
            return false;
        }
      }

    async _onLoadUserCompleted(userID, user) {
        if(global['authUser'] && global['authUser'].mobile_activation < 1) {
            this._showEula();
            return false;
        }

        this.setState({loadingView:false});
        this.props.resetRoute(Routes.memberList());
    }

    _showEula() {
        let data = {};
        this.props.resetRoute(Routes.terms(), data);
        return true;
    }

    _onLoadUserFailed(message) {
        this.setState({loadingView:false, error:message});
     }

    _goToForgotPassword() {
        this.props.toRoute(Routes.forgotPassword(), {});
    }

    _renderLoginInputs() {
        const icons = {
            email:require('Code/Assets/Icons/email-icon.png'),
            password:require('Code/Assets/Icons/password-icon.png')
        };

        return (
            <View> 
              <AppTextInput 
                imageSource = {icons.email }
                placeholder = " email"
                onChangeText = {(text) => this.email = text}
              />

              <AppTextInput 
                imageSource = { icons.password }
                placeholder = "password"
                secureTextEntry = {true}
                onChangeText = {(text) => this.password = text}
              />
            </View>
        );
    }

    _renderLoginButtons() {
        return (
            <View style = {{flex:1}} >
                <AppButton
                    text = "login"
                    onPress = {() => this._loginUser()}
                />
            <Text style = {Styles.subtext} 
                 onPress= {() => this._goToForgotPassword()}>Forgot password?</Text>
            
            <Spinner  visible={this.state.loadingView}>
              <LoadingView>
                  Please wait...
              </LoadingView>
            </Spinner>
            
            </View>
        );
    }

    _renderErrorView() {
        return(
            <View style = { Styles.errorView } >
              <Text style = { {color:'red'} } >{this.state.error}</Text>
            </View>
        );
    }

    _render() {
        return (
            <Container>
                <BackgroundImage/>
                <Content scrollEnabled = {false} >
                        <Card style = {Styles.viewContainer}>
                            <CardItem>
                                <Text style = {Styles.cardHeader} >Login to stay connected with your batchmates</Text>
                            </CardItem>
                            <CardItem>
                                <View>
                                    { (this.state.error) ? this._renderErrorView() : null }
                                    {this._renderLoginInputs()}
                                </View>
                            </CardItem>
                            <CardItem footer>
                            {this._renderLoginButtons()}
                            </CardItem>
                        </Card>
                </Content>
            </Container>
        );
        
    }


    render() {
        return (this.state.showView) ? this._render() : null;
    }
}

export default Login
