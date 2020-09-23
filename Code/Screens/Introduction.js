'use strict';
import React, { Component } from 'react';
import {View, Image, TouchableWithoutFeedback, StatusBar} from 'react-native';
import { Icon,  Container, Content, Text  } from 'native-base';
import Styles from 'Code/Styles/Introduction';
import Routes from 'Code/Routes/Routes';
var context = null;
class Introduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
        };
    }

    componentWillMount() {
    }


    _backToHome() {
        this.props.back();
    }

    _renderHeader() {
        return (
            <View style = {Styles.customHeader}>
                <Text style = {Styles.titleView} >Tiranve</Text>
                <Icon onPress = {() => this._backToHome()} name="times" style = {Styles.closeIcon}/>
            </View>
        );
    }

    _renderContent() {
        return (
            <View>
                <Text style = {Styles.introductionText}>25 years have gone by since we embarked upon our life journeys post IIT.
In these two and half decades some of us have gained some (weight) or not; lost some (hair) or not; married and multiplied or not; moved to another country or not; changed many jobs or not; set up ventures or not; done this or more. This book puts it all together.
Each one of us has put in special effort to put together the last 25 years in few words and pictures. This, hope- fully, will help us all to reconnect and build our network even stronger.
Read on, bring back old memories.</Text>

                <Text style = {Styles.introductionFooter} >Pau and Team Tiranve.</Text>

            </View>
            
        );
    }

    _renderStatusBar() {
        return (
            <Text style = {Styles.customStatusBar}></Text>
        );
    }



    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content"/>
                <Content scrollEnabled = {false} >
                    {this._renderHeader()}
                    {this._renderContent()}
                </Content>
            </Container>
        );
        
    }
}

export default Introduction
