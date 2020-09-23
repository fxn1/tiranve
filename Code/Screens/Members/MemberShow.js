'use strict';
import React, { Component } from 'react';
import {View, Clipboard, Dimensions, TextInput, Image, TouchableWithoutFeedback, StatusBar, ScrollView} from 'react-native';
import { Icon,  Container, DeckSwiper,Left, Thumbnail, Header, Content, Card, CardItem, Text, Body, Button, Tabs, Tab, ScrollableTab } from 'native-base';
import BackgroundImage from 'Code/Views/BackgroundImage';
import AppTextInput from 'Code/Views/Inputs/AppTextInput';
import AppButton from 'Code/Views/AppButton';
import Styles from 'Code/Styles/MemberShow';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingView from 'Code/Views/LoadingView';
import Routes from 'Code/Routes/Routes';
import Slideshow from 'Code/Views/Slideshow';
import Helpers from 'Code/Classes/Helpers';
import Actions from 'Code/Actions/CommonActions';
import BackgroundImageSecond from 'Code/Views/BackgroundImageSecond';
import Communications from 'react-native-communications';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';

var windowHeight = Dimensions.get('window').height;
var context = null;
class MemberShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignup: false,
            loadingView: true,
            error:null,
            show_edit:false,
            visible:true
        };

        this._member = null;
        this._contentOffset = {};
    }

    componentWillUnmount() {
        global.showAuthProfile = false;
    }

    componentDidMount() {
        context = this;
        let routeData = this.props.routeData;
        let memberID = (routeData && routeData.memberID) ? routeData.memberID : null;

        if(global.showAuthProfile)  {
            memberID = global.memberID;
        }

        Actions.getMemberDetails(memberID);
        this._setupListeners();
    }

    _setupListeners() {
        Helpers.removeListeners(this);
        if (!this._listeners) {
            this._listeners = [];
        }

        this._listeners[this._listeners.length]= Actions.getMemberDetails.completed.listen(this._fetchedMemberDetailsSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.getMemberDetails.failed.listen(this._fetchedMemberDetailsFailed.bind(this));

        this._listeners[this._listeners.length]= Actions.getNextPofile.completed.listen(this._fetchedNextPofileDetailsSuccessfully.bind(this));
        this._listeners[this._listeners.length]= Actions.getNextPofile.failed.listen(this._fetchedNextPofileDetailsFailed.bind(this));
    }


    _fetchedNextPofileDetailsSuccessfully(memberData) {
        if(this._contentView) {
            this._contentView.scrollTo(0,0);
        }
        
        this._fetchedMemberDetailsSuccessfully(memberData);
    }

    _fetchedNextPofileDetailsFailed(err) {
        this._fetchedMemberDetailsFailed(err);
    }

    _fetchedMemberDetailsSuccessfully(memberData) {
        if(this._contentView) {
            this._contentView.scrollTo(0,0);
        }
        this._member = memberData;
        this.state.show_edit = this._member.can_edit;
        this.setState({loadingView:false});
    }

    _fetchedMemberDetailsFailed(err) {
        this.setState({loadingView:false});
    }

    _backToList() {
        this.props.back();
    }

    

    _renderHeader() {
        if(!this._member) {
            return <View/>;
        }

        let name = (this._member.name) ?this._member.name : '';
        let nickname = (this._member.nickname) ?this._member.nickname : '';
        let phone = (this._member.phone) ?this._member.phone : '';
        let email = (this._member.email) ?this._member.email : '';
        let branch = (this._member.data) ?this._member.data.branch : '';
        let hostel = (this._member.data) ?this._member.data.hostel : '';
        return(
            <View>
                <View style = {Styles.subHeaderView}>
                    <Text  selectable = {true}   style = {Styles.memberName} >{name}</Text>
                    <Text  selectable = {true}   style = {Styles.memberNickName}>{nickname}</Text>
                </View>
                <View style = {Styles.headerSubAreaView}  >
                    <View style = {Styles.memberBranchNameView}>
                        <Text  selectable = {true}   style = {Styles.memberBranchName}>{branch}</Text>
                    </View>
                    <View style = {Styles.headerSubAreaTextSapratorView}>
                        <Text  selectable = {true}   style = {Styles.headerSubAreaTextSaprator}>.</Text>
                    </View>
                    <View style = {Styles.memberHostelNameView}>
                        <Text  selectable = {true}   style = {Styles.memberHostelName}>{hostel}</Text>
                    </View>
                </View>
            
            </View>
        );
    }

    _renderMemberImages() {

        if(!this._member) {
            return <View/>;
        }
        
        let imageData = this._member.images;

        if(!imageData) {
          return <View/>;
        }

        const cards = [
            {
              url: imageData.new_picture
            },
            {
                url:imageData.old_picture
            },

            {
                url:imageData.family_picture
            },
        
          ];

        return (
            <View style = {Styles.sliderView} >
                 <Slideshow 
                    arrowSize = {0}
                    dataSource={cards}/>
            </View>
        );
    }

    _renderSortInfo() {

        if(!this._member || !this._member.data) {
            return <View/>;
        }

        let phone = (this._member.phone) ?this._member.phone : '';
        let email = (this._member.email) ?this._member.email : '';

        return (
            <View style = {Styles.subBoxes} >
                <Card style = {Styles.subBoxContentView}>
                    <View style = {Styles.sortInfoView} >
                        <View style = {{...Styles.sortInfoViewItem}} >
                            <Text  selectable = {true}   style = {Styles.sortInfoViewItemText} >{this._member.data.company}</Text>
                            {this._renderPopoverItemForEmail(email)}
                        </View>
                        
                        <View style = {{...Styles.sortInfoViewItem}}>
                            <Text  selectable = {true}   style = {{...Styles.sortInfoViewItemText, height:20}}>{this._member.data.location}</Text>
                            {this._renderPopoverItemForPhone(phone)}
                        </View>
                    </View>
                </Card>
          </View>
        );
    }

    _copyContent(info) {
        Clipboard.setString(info);
        return;
    }

    _sendEmail(email) {
        Communications.email([email],null,null,'','');
        return;
    }

    _renderPopoverItemForEmail(email) {
        return (
        <PopoverTouchable >
            <Icon
                style = {{...Styles.sortInfoViewItemText, ...Styles.sortInfoViewItemTextRight }} 
                name= "envelope" 
            />
        <Popover ref = {(ref) => this._popover = ref}  placement = 'left' 
                visible = {this.state.visible}>
            <View style =  {Styles.popOverContentView}>
                    <Text onPress = {() => this._copyContent(email)} > Copy</Text>
                    <Text onPress = {() => this._sendEmail(email)} >Send Mail</Text>
            </View>
        </Popover>
      </PopoverTouchable>
    );
    }


    _callPhone(phone) {
        Communications.phonecall(phone, true);
        return true;
    }

    _renderPopoverItemForPhone(phone) {
        return (
        <PopoverTouchable >
            <Icon
                style = {{...Styles.sortInfoViewItemText, ...Styles.sortInfoViewItemTextRight }} 
                name= "phone" 
            />
        <Popover ref = {(ref) => this._popover = ref}  placement = 'left' 
                visible = {this.state.visible}>
            <View style =  {Styles.popOverContentView}>
                    <Text onPress = {() => this._copyContent(phone)} > Copy</Text>
                    <Text onPress = {() => this._callPhone(phone)} >Call</Text>
            </View>
        </Popover>
      </PopoverTouchable>
    );
    }

    _renderFamily() {

        if(!this._member || !this._member.data) {
            return <View/>;
        }

        return(
            <TouchableWithoutFeedback>
                <ScrollView style = {Styles.tabContent} >
                    <Text  selectable = {true}   style = {Styles.normalText} >{this._member.data.life_after_iitd}</Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }

    _renderAnecdote() {
        if(!this._member || !this._member.data) {
            return <View/>;
        }

        return(
            <TouchableWithoutFeedback>
                <ScrollView style = {Styles.tabContent} >
                    <Text  selectable = {true}   style = {Styles.normalText}>{this._member.data.special_moment}</Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }


    _renderLifeAfterIITD() {

        if(!this._member || !this._member.data) {
            return <View/>;
        }

        return(
            <TouchableWithoutFeedback>
                <ScrollView style = {Styles.tabContent} >
                    <Text  selectable = {true}   style = {Styles.normalText}>{this._member.data.life_at_iitd}</Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }

    _onTabChanged(data) {
        let index = data['i'];
        let from = data['from'];
        let toOffset = windowHeight*0.28;
        
        if(!index && !from) {
            return false;
        }

        if(!this._contentOffset.y) {
            this._contentOffset.y = toOffset-1;
        }
       
        if(this._contentView && this._contentOffset.y < toOffset) {
            this._contentView.props.scrollToPosition(0, toOffset);
        }
        
    }

    _renderJourney() {
        return(
            <View style = {Styles.subBoxes} >
                <Card style = {{ borderColor :'#fff'}}>
                    <View>
                    <Tabs 
                        initialPage={0}
                        onChangeTab = {(data) => this._onTabChanged(data)}
                        ref = {(tabView) => this._tabView = tabView}
                        locked = {false}
                        renderTabBar={()=> <ScrollableTab tabsContainerStyle = {Styles.scrollableTabContainer} /> }>
                        
                        <Tab heading="Life after IITD" >
                            {this._renderLifeAfterIITD()}
                        </Tab>

                        <Tab heading="Family">
                            {this._renderFamily()}
                        </Tab>

                        <Tab heading="Anecdote">
                            {this._renderAnecdote()}
                        </Tab>

                    </Tabs>

                    </View>
                </Card>
            </View>
        );
    }

    _renderTextFrom25YearAgo() {
        if(!this._member || !this._member.data) {
            return <View/>;
        }

        return(
            <View style = {Styles.subBoxes}  >
                <Card style = {{...Styles.subBoxContentView, ...Styles.yearsAgoView }}>
                <Text  selectable = {true}   style = {Styles.yearsAgoText} >Text from 25 Years Ago</Text>
                    <TouchableWithoutFeedback>
                        <ScrollView style = {Styles.tabContent} >
                            <Text  selectable = {true}   style = {Styles.normalText}>{this._member.data.text_25year_ago}</Text>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </Card>
            </View>
        );
    }


    _showNextProfile() {
        this.setState({loadingView:true});
        if(this._member.id) {
            Actions.getMemberDetails(this._member.nav.next_id);
        }
    }

    _showPreviousProfile() {
        this.setState({loadingView:true});
        if(this._member.id) {
            Actions.getMemberDetails(this._member.nav.pre_id);
        }
    }

    _renderNavButton() {
        return(
            <TouchableWithoutFeedback >
            <View style = {Styles.navBarView} >
            <TouchableWithoutFeedback onPress = {() => this._showPreviousProfile()} >
            <View style = {Styles.showNextProfileView} >
                <Image style = {Styles.nextProfileImage} source = {require('Code/Assets/Icons/left-icon.png')}/>
                <Text  selectable = {true}   style = {Styles.showPreText }>Previous Profile</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress = {() => this._showNextProfile()}>
            <View style = {Styles.showNextProfileView} >
                <Text  selectable = {true}   style = {Styles.showNextText }>Next Profile</Text>
                <Image style = {Styles.nextProfileImage} source = {require('Code/Assets/Icons/right-icon.png')}/>
            </View>
            </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderEditProfileButton() {
        return(
            <View style = {{position:'absolute', bottom:5, left:0, right:0}} >
                <AppButton
                    style = {{width:100, paddingVertical:5}}
                    text = "edit"
                    onPress = {() => this._editProfileButton()}
                />
            </View>
        );
    }

    _editProfileButton() {
        this.props.toRoute(Routes.memberProfile())
    }

    _onScroll(obj) {
        if(!obj) {
            return false;
        }
        this._contentOffset = obj.nativeEvent.contentOffset;
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="dark-content"/>
                 <BackgroundImageSecond/>
                <Content innerRef={ref => {this._contentView = ref}}
                         onScroll = {(obj) => this._onScroll(obj)}
                >
                    {this._renderHeader()}
                    {this._renderMemberImages()}
                    <View style = {Styles.profileDataView}>
                        {this._renderSortInfo()}
                        {this._renderJourney()}
                        {this._renderTextFrom25YearAgo()}
                        {(!this.state.show_edit) ? this._renderNavButton() : null}
                    </View>
                </Content>
                    {(this.state.show_edit) ? this._renderEditProfileButton():null}
                    <Spinner  visible={this.state.loadingView}>
                    <LoadingView>
                        Please wait...
                    </LoadingView>
                    </Spinner>
                   
            </Container>
        );
        
    }
}

export default MemberShow
