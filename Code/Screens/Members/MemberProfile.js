'use strict';
import React, { Component } from 'react';
import {View, TextInput, Image, TouchableWithoutFeedback, StatusBar} from 'react-native';
import { Icon, Form,  Container, DeckSwiper,Left, Thumbnail, Header, Content, Card, CardItem, Text, Body, Button, Tabs, Tab, ScrollableTab } from 'native-base';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/MemberProfile';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';
import RegularInput from 'Code/Views/Inputs/RegularInput';
import FileInput from 'Code/Views/Inputs/FileInput';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';
import AuthUser from 'Code/Classes/AuthUser';


class MemberProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            loadingView: true,
            error:null,
        };
        this._member = null;
    }


    componentWillMount() {

        this._fetchUserInfo();
        this._setupListeners();
    }

    async _fetchUserInfo() {
        let user = await AuthUser.get();
        if(!user) {
            return false;
        }
        let userID = user.id;
        Actions.getMemberDetails(userID);
    }

    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.getMemberDetails.completed.listen(this._fetchedMemberDetailsSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.getMemberDetails.failed.listen(this._fetchedMemberDetailsFailed.bind(this));

        this._listeners[this._listeners.length]= Actions.updateProfile.completed.listen(this._fetchedupdateProfileSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.updateProfile.failed.listen(this._fetchedupdateProfileFailed.bind(this));
    }

    _fetchedMemberDetailsSuccessfully(memberData) {
        this._member = memberData;
        this.setState({loadingView:false});
    }

    _fetchedMemberDetailsFailed(err) {
        this.setState({loadingView:false});
    }

    _fetchedupdateProfileSuccessfully() {
        this.setState({loadingView:false});
    }

    _fetchedupdateProfileFailed() {
        this.setState({loadingView:false});
    }

    _backToList() {
        this.props.back();
    }

    _renderHeader() {
        return(
            <View style = {Styles.subHeaderView}>
                <Text style = {Styles.pagetitle} >Edit profile</Text>
            </View>
        );
    }

    _renderGeneralDetailsForm() {
        return(
            <Form>
                <RegularInput
                    label = {'Name'}
                    ref = 'name'
                    editable = {this.state.editable}
                    defaultValue = {this._member.name}
                    returnKey = 'next'
                    placeholder = {'Enter Name'}
                    onChangeText = {(text) => {this._member.name = text}}
                />

                <RegularInput
                    label = {'Nickname'}
                    ref = 'nickname'
                    editable = {this.state.editable}
                    defaultValue = {this._member.nickname}
                    placeholder = {'Enter Nickname'}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.nickname = text}}
                />

                <RegularInput
                    label = {'Phone number'}
                    ref = 'phone_number'
                    placeholder = {'Enter Phone number'}
                    editable = {this.state.editable}
                    defaultValue = {this._member.phone}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.phone = text}}
                />

            </Form>
        );
    }

    _renderImagesForm() {
        return(
            <View>
                <Text style = {Styles.uploadImageText}>Upload Images</Text>

                <Form>
                    <View style = {Styles.uploadImagesContainer}>
                        <View style = {Styles.uploadImagesLeftView} >
                            <FileInput 
                                label = 'new photo'
                                imageStyle = {Styles.new_photo}
                                cameraStyle = {Styles.new_photo_camera}
                                imageSourceUri = {this._member.images.new_picture}
                                onSelect = {(response) =>  this._member.images.new_picture = response.uri}
                            />
                        </View>

                        <View style = {Styles.uploadImagesRightView} >
                            <FileInput 
                                label = 'family photo'
                                imageStyle = {Styles.family_photo}
                                cameraStyle = {Styles.family_photo_camera}
                                imageSourceUri = {this._member.images.family_picture}
                                onSelect = {(response) =>  this._member.images.family_picture = response.uri}
                            />
                            <FileInput 
                                label = 'old photo'
                                imageStyle = {Styles.old_photo}
                                cameraStyle = {Styles.old_photo_camera}
                                imageSourceUri = {this._member.images.old_picture}
                                onSelect = {(response) =>  this._member.images.old_photo = response.uri}
                            />
                    </View>
                    </View>
                </Form>
            </View>
        ) ;
        
    }

    _renderProfessionalDetailsForm() {
        return(
            <Form>
                <RegularInput
                    label = {'Company'}
                    ref = 'company'
                    editable = {this.state.editable}
                    defaultValue = {this._member.data.company}
                    returnKey = 'next'
                    placeholder = {'Enter Company'}
                    onChangeText = {(text) => {this._member.data.company = text}}
                />

                <RegularInput
                    label = {'Location'}
                    ref = 'location'
                    editable = {this.state.editable}
                    defaultValue = {this._member.data.location}
                    placeholder = {'Enter Location'}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.data.location = text}}
                />

                <RegularInput
                    label = {'Life after IITD'}
                    inputStyle = {{height:100}}
                    multiline = {true}
                    ref = 'life_after_iitd'
                    placeholder = {'Life after IITD'}
                    editable = {this.state.editable}
                    defaultValue = {this._member.data.life_after_iitd}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.data.life_after_iitd = text}}
                />

                <RegularInput
                    label = {'Family'}
                    inputStyle = {{height:100}}
                    multiline = {true}
                    ref = 'family'
                    placeholder = {'Family'}
                    editable = {this.state.editable}
                    defaultValue = {this._member.data.life_at_iitd}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.data.life_at_iitd = text}}
                />

                <RegularInput
                    label = {'Anecdote'}
                    inputStyle = {{height:100}}
                    multiline = {true}
                    ref = 'anecdote'
                    placeholder = {'Anecdote'}
                    editable = {this.state.editable}
                    defaultValue = {this._member.data.special_moment}
                    returnKey = 'next'
                    onChangeText = {(text) => {this._member.data.special_moment = text}}
                />


            </Form>
        );
    }

    _saveProfileDetails() {

        let formData = this._setupFormDetails();
        Actions.updateProfile(formData);
        this.setState({loadingView:true});
    }

    _setupFormDetails() {
        let formData = new FormData();

        let fileds =['nickname', 'phone', 'company', 'location', 'life_after_iitd', 'life_at_iitd', 'special_moment'];
        formData.append('name', this._member.name);
        for(var key in fileds) {
            let formKey = fileds[key];
            let memberData = this._member.data;
            let value = memberData[formKey];
            if(!value) {
                value = '';
            }
            formData.append(`${formKey}`, value);
        }

        let images = this._member.images;

        let newPicture = {
            uri: images['new_picture'],
            type: 'image/png',
            name: 'new_picture.png'
        };

        let oldPicture = {
            uri: images['old_picture'],
            type: 'image/png',
            name: 'old_picture.png'
        };

        let familyPicture = {
            uri: images['family_picture'],
            type: 'image/png',
            name: 'family_picture.png'
        };

        formData.append(`new_picture`, newPicture);
        formData.append(`old_picture`, oldPicture);
        formData.append(`family_picture`, familyPicture);
        return formData;

    }

    _renderSaveProfileDetails() {
        return (
            <View style = {Styles.saveDetailsButton} >
                <AppButton
                    text = "save"
                    onPress = {() => this._saveProfileDetails()}
                />
            
            <Spinner  visible={this.state.loadingView}>
              <LoadingView>
                  Please wait...
              </LoadingView>
            </Spinner>
            
            </View>
        );
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="dark-content"/>
                <Content style = {{backgroundColor:'#fff'}}>
                    <TouchableWithoutFeedback>
                    <View>
                        {this._renderHeader()}
                        {(this._member) ? this._renderGeneralDetailsForm() : null}
                        {(this._member) ? this._renderImagesForm(): null}
                        {(this._member) ? this._renderProfessionalDetailsForm(): null}
                        {this._renderSaveProfileDetails()}
                    </View>
                    </TouchableWithoutFeedback>
                </Content>
            </Container>
        );
        
    }
}

export default MemberProfile
