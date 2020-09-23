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
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';


class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            loadingView: false,
            error:null,
        };

        this.email = '';
    }

    componentWillMount() {
        this._setupListeners();
    }


    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.forgotPassword.completed.listen(this._forgotPasswordSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.forgotPassword.failed.listen(this._forgotPasswordFailed.bind(this));
    }


    _forgotPasswordSuccessfully() {
    }

    _forgotPasswordFailed() {
        
    }

    _backToLogin() {
        this.props.back();
    }

    _renderInputsField() {
        const icons = {
            email:require('Code/Assets/Icons/email-icon.png')
        };
        return (
            <View style> 
              <AppTextInput 
                imageSource = {icons.email }
                placeholder = " email"
                onChangeText = {(text) => this.email = text}
              />
            </View>
        );
    }

    _renderSubmitButtons() {
        return (
            <View style = {{flex:1}} >
                <AppButton
                    text = "Get new password"
                    onPress = {() => this._generateNewPassword()}
                />
            <Text style = {Styles.subtext}
                  onPress = {() => this._backToLogin()}
            
            >Back to login</Text>
            
            <Spinner  visible={this.state.loadingView}>
              <LoadingView>
                  Please wait...
              </LoadingView>
            </Spinner>
            
            </View>
        );
    }

    _generateNewPassword() {
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if(!this.email) {
            this.setState({error:'Your email is required'});
            return false;
        }

        if(!emailPattern.test(this.email)) {
            this.setState({error:'Your email is required'});
            return false;
        }
       
        Actions.forgotPassword(this.email);
        alert("You will get a new password on your registered email id");
        this._backToLogin();
        
    }

    _renderErrorView() {
        return(
            <View style = { Styles.errorView } >
              <Text style = { {color:'red'} } >{this.state.error} </Text>
            </View>
        );
    }


    render() {
        return (
            <Container>
                <Content scrollEnabled = {false}>
                    <BackgroundImage/>
                    <Card style = {Styles.viewContainer}>
                        <CardItem header>
                        <Text>Enter your registered email id</Text>
                        </CardItem>
                        <CardItem>
                        <Body>
                            {(this.state.error) ? this._renderErrorView() : null}
                            {this._renderInputsField()}
                        </Body>
                        </CardItem>
                        <CardItem footer>
                         {this._renderSubmitButtons()}
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
        
    }
}

export default ForgotPassword
