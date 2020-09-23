'use strict';
import React, { Component } from 'react';
import {View, TextInput, StatusBar, TouchableWithoutFeedback} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/Settings';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            loadingView: false,
            error:null,
        };
    }

    componentDidMount() {
        this._setupListeners();
    }


    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.changePassword.completed.listen(this._changePasswordSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.changePassword.failed.listen(this._changePasswordFailed.bind(this));
    }

    _changePasswordSuccessfully(response) {
        this.setState({loadingView:false});
        this.props.resetRoute(Routes.memberList());
    }

    _changePasswordFailed() {
        this.setState({loadingView:false});
    }

    _backToLogin() {
        this.props.back();
    }

    _generateNewPassword() {
        if(!this._password) {
            this.setState({error:'Password is required'});
            return false;
        }

        if(this._password.length < 6) {
            this.setState({error:'Passwords must be at least six characters'});
            return false;
        }



       Actions.changePassword(this._password);
       this.setState({loadingView:true,error:null });
    }

    _logoutUser() {
        Actions.logout();
        this.props.resetRoute(Routes.login());
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
            <Container style = {Styles.container} >
                <StatusBar barStyle="dark-content"/>
                <Content scrollEnabled = {false}>
                    <Text style = {Styles.changePasswordText}  >Change password</Text>
                    {(this.state.error) ? this._renderErrorView() : null}
                    <AppTextInput 
                        viewStyle = {Styles.changePasswordInput}
                        placeholder = " new password"
                        secureTextEntry = {true}
                        onChangeText = {(text) => this._password = text}
                    />

                    <AppButton
                        style = {Styles.changePasswordButton}
                        text = "save"
                        onPress = {() => this._generateNewPassword()}
                    />

                   
                    
                </Content>
                <TouchableWithoutFeedback onPress = {() => this._logoutUser()}>
                    <View style = { Styles.logoutButtonView} >
                            <Text style = {Styles.logoutButtonText}
                            >logout</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style = { Styles.contactUsView} >
                    <Text style = {Styles.contactUsText} >Contact us</Text>
                    <View style = {Styles.contactUsViewItem} >
                        <Text style = {Styles.contactUsViewItemHeading} >Email:</Text>
                        <Text style = {Styles.contactUsViewItemValue} >contact@coloredcow.com</Text>
                    </View>

                    <View style = {Styles.contactUsViewItem} >
                        <Text style = {Styles.contactUsViewItemHeading} >Phone:</Text>
                        <Text style = {Styles.contactUsViewItemValue} >+91 9917443994</Text>
                    </View>
                </View>

                <Spinner  visible={this.state.loadingView}>
                    <LoadingView>
                        Please wait...
                    </LoadingView>
                </Spinner>

            </Container>
        );
        
    }
}

export default Settings
