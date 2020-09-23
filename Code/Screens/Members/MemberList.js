'use strict';
import React, { Component } from 'react';
import {View, TextInput, ListView, TouchableWithoutFeedback, ScrollView, FlatList, StatusBar} from 'react-native';
import { Container, Thumbnail, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/MemberList';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';
import Prompt from 'Code/Views/Prompt/Index';


var ds = null;

class MemberList extends Component {

    constructor(props) {
        super(props);
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        this.state = {
            isSignup: false,
            loadingView: true,
            error:null,
            promptVisible:false
        }; 
    }
    componentWillMount() {
        Actions.getMemberList();
        this._setupListeners();
    }


    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.getMemberList.completed.listen(this._fetchedMemberListSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.getMemberList.failed.listen(this._fetchedMemberListFailed.bind(this));
    }

    _setupRowData(memberData) {
        this.setState({
            loadingView:false,
            flatData:memberData,
        })
    }

    _fetchedMemberListSuccessfully(memberData) {
        this._setupRowData(memberData);
    }

    _fetchedMemberListFailed(err) {
        this.setState({loadingView:false});
    }   

    _showMember(row) {
        this.props.toRoute(Routes.memberShow(), {memberID:row.id});
    }
   
    _renderSubHeader() {
        return (
            <View style = {Styles.subHeaderView}>
                <Text style = {Styles.subHeadertext}>IITD Batch of `93</Text>
            </View>
        );
    }


    _showReportPrompt() {
        this.setState({promptVisible:true});
    }


    _renderSingleItem(row, i) {
        let imageUri = 'https://via.placeholder.com/450x250?text=Tiranve';
        if(row.new_picture) {
            imageUri = row.new_picture;
        }

        return (
            <TouchableWithoutFeedback onPress = {() => this._showMember(row)} key = {i} onLongPress = {() => this._showReportPrompt()} >
                <View key = {i} style = {Styles.singleRowItem} >
                <Thumbnail large source={{uri: imageUri, cache: 'force-cache'}} style = {Styles.memberImage} />
                     <Text style = {Styles.memberName}>{row.name}</Text>
                     <Text style = {Styles.memberDesc}>{row.life_at_iitd}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }


    _renderRow(rowData) {
        let itemData = rowData.item;
        return (
            <View style = {[Styles.singleRow]}  >
                {(itemData) ? itemData.map(this._renderSingleItem.bind(this)) : null}
            </View> 
        );
    }


    _rendarListView() {
        return (
            <TouchableWithoutFeedback>
                <View style = {{flex:1}} >
                    <FlatList
                        removeClippedSubviews={false}
                        pagingEnabled = {true}
                        data={this.state.flatData}
                        renderItem={this._renderRow.bind(this)}
                        getItemLayout={(data, index) => ({length: Styles.imageRow.height, offset: Styles.imageRow.height * index, index})}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _showIntro() {
        this.props.toRoute(Routes.introduction());
    }

    _fireReportContentEvent(value) {
        if(this._promptRef) {
            this._promptRef.close();
        }
        Actions.reportContent({reportContent:value});
        this.setState({promptVisible:false});
    }

    _renderPrompt() {
        return (<Prompt
                    ref = {(ref) => this._promptRef = ref }
                    title="Report Content"
                    placeholder="Please describe your reason for reporting"
                    textInputProps = { { autoFocus:true, multiline:true, numberOfLines:19, style: Styles.promptStyle } }
                    visible={ this.state.promptVisible }
                    onCancel={ () => this.setState({promptVisible: false})}
                    onSubmit={ (value) => this._fireReportContentEvent(value)}
        />);
    }

    render() {
        let navigator = this.props.navigator;
        navigator._onTitlePress = this._showIntro.bind(this);

        return (
                <Container style = {Styles.container} >
                    <StatusBar barStyle="dark-content"/>
                    <Content >
                        {this._renderSubHeader()}
                        {(this.state.flatData) ? this._rendarListView():null} 
                    </Content>

                    {this._renderPrompt()}
                    <Spinner  visible={this.state.loadingView}>
                        <LoadingView>
                            Please wait...
                        </LoadingView>
                    </Spinner>
                </Container>
        );
    }
}

export default MemberList
