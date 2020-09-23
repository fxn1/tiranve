'use strict';
import React, { Component } from 'react';
import { Thumbnail,  Content, Card, CardItem, Text, Body, Container, Header, Item, Input, Icon, Button } from 'native-base';
import {View, TextInput, ListView, TouchableWithoutFeedback, ScrollView, FlatList, StatusBar} from 'react-native';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/Search';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';
import RegularInput from 'Code/Views/Inputs/RegularInput';
import RightIconTextInput from 'Code/Views/Inputs/RightIconTextInput';

var ds = null;


export default class Search extends Component {

    constructor(props) {
        super(props);
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        this.state = {
            isSignup: false,
            loadingView: false,
            error:null,
            
        }; 
        this.searchString = '';
    }

    componentWillMount() {
        this._setupListeners();
    }

    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.getFilteredData.completed.listen(this._fetchedMemberListSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.getFilteredData.failed.listen(this._fetchedMemberListFailed.bind(this));
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

    _searchData(toSearch) {
        Actions.getFilteredData(toSearch);
        this.setState({loadingView:true});
    }
   
    _renderSubHeader() {
        return (
            <View style = {Styles.subHeaderView}>
                <Text style = {Styles.subHeadertext}>IITD Batch of '93'</Text>
            </View>
        );
    }

    _renderSingleItem(row, i, lessThenThree) {

        let imageUri = 'https://via.placeholder.com/450x250?text=Tiranve'

        if(row.new_picture) {
            imageUri = row.new_picture;
        }

        return (
            <TouchableWithoutFeedback onPress = {() => this._showMember(row)} key = {i}>
            <View key = {i} style = {[Styles.singleRowItem, (lessThenThree) ? Styles.lessThenThreeItem :{}]} >
                   <Thumbnail large source={{uri: imageUri}} style = {Styles.memberImage} />
                   <Text style = {Styles.memberName}>{row.name}</Text>
                   <Text style = {Styles.memberDesc}>{row.life_at_iitd}</Text>
            </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderRow(rowData) {
        let itemData = rowData.item;
        let lessThenThree = (itemData.length < 3) ? true : false;
        
        return (
                <View style = {[Styles.singleRow, (lessThenThree) ? Styles.lessThenThreeView:{} ]} >
                {(itemData) ? itemData.map((item, i ) =>  this._renderSingleItem(item, i, lessThenThree)) : null}
                </View>
           
        );
    }

    _rendarListView() {
        return (
            <TouchableWithoutFeedback>
                <View style = {{flex:1}} >
                    <FlatList
                        removeClippedSubviews={false}
                        data={this.state.flatData}
                        renderItem={this._renderRow.bind(this)}
                    />
                </View >
            </TouchableWithoutFeedback>
        );
    }

    _clearSearch() {
        this.searchString = '';
        this.state.flatData = null;
        this.setState({loadingView:false});
    }

    _onChnageText(text) {
        this.searchString = text;
        this.setState({loadingView:false});
    }


  render() {
    const icons = {
        search:require('Code/Assets/Icons/cross-icon.png'),
    };

    return (
      <Container>
          <StatusBar barStyle="dark-content"/>
        <View style = {Styles.header} >
            <RightIconTextInput
                defaultValue = {this.searchString}
                imageSource = {(this.searchString) ? icons.search : null}
                placeholder = "Search"
                onChangeText = {(text) => this._onChnageText(text)}
                onIconPress = {() => this._clearSearch(this.searchString)}
                onSubmitEditing = {() => this._searchData(this.searchString)}
                returnKey = 'search'
                autoFocus = {true}
            />
        </View>
        
        <Content style = {Styles.listView} >
            {(this.state.flatData) ? this._rendarListView():null}   
        </Content>
        <Spinner  visible={this.state.loadingView}>
            <LoadingView>
                Please wait...
            </LoadingView>
        </Spinner>

      </Container>
    );
  }
}