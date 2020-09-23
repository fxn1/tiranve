'use strict';

import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Styles from 'Code/Styles/Terms';
import Routes from 'Code/Routes/Routes';
import SharedStyles from 'Code/Styles/SharedStyles';
import AccessToken from 'Code/Classes/AccessToken';
import Actions from 'Code/Actions/CommonActions';
import AuthUser from 'Code/Classes/AuthUser';


class Terms extends Component {

  constructor(props) {
    super(props);
      this.state = {
        show: false,
        loggedin: true
      }
  }

  agreeTerms() {
    global['authUser'].mobile_activation = 1;
    AuthUser.set(global['authUser']);
    Actions.activeMobile();
    let data = this.props.routeData;
    this.props.resetRoute(Routes.login(), data);
  }
  
  cancelTerms() {
    AccessToken.get()
            .then((token) => {
              AsyncStorage.removeItem('PROFILE_IMAGE');
              Actions.logout(token);
              this.props.resetRoute(Routes.login());
            })
            .catch((err) => {
              Actions.logout();
              AsyncStorage.removeItem('PROFILE_IMAGE');
              this.props.resetRoute(Routes.login());
    });
  }
  
  render() {
    return (
        <View style={[SharedStyles.screenContainer, Styles.container]}>
          <View style = {Styles.mainView}> 
            <View style = { Styles.header } > 
              <Text style = { Styles.header_text }>Terms and Conditions</Text> 
            </View>

            <ScrollView style = {Styles.content}>
              <Text> {"Last Update : 17 Feb 2018\n\nPlease read this EndUser License Agreement (EULA) carefully before clicking the 'I Agree' button, downloading or using Tiranve. By clicking the 'I Agree' button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this EULA.\nIf you do not agree to the terms of this EULA, do not click on the 'I Agree' button and do not\ndownload or use the Application.\n\nLicense\n\nTiranve grants you a revocable, nonexclusive, nontransferable, limited license\nto download, install and use the application for the purpose of your work with Tiranve\nstrictly in accordance with the terms of this EULA.\n\nRestrictions\n\nYou agree not to, and you will not permit others to:\n\na) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise\ncommercially exploit the Tiranve Application or make the Tiranve Application available to any third party.\n\nb) post objectionable content in form of graphics or text. Objectionable content includes, but is not limited to: (i) sexually explicit materials; (ii) obscene, defamatory, libelous, slanderous, violent and/or unlawful content or profanity; (iii) content that infringes upon the rights of any third party, including copyright, trademark, privacy, publicity or other personal or proprietary right, or that is deceptive or fraudulent; (iv) content that promotes the use or sale of illegal or regulated substances, tobacco products, ammunition and/or firearms; and (v) gambling, including without limitation, any online casino, sports books, bingo or poker.\n\nTiranve reserves the right to temporarily or permanently remove objectionable content and disable user accounts, if above mentioned restrictions are breached. \n\nModifications to Application\n\nTiranve reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without\nliability to you.\n\nTerm and Termination\n\nThis EULA shall remain in effect until terminated by you or Tiranve.\nTiranve may, in its sole discretion, at any time and for any or no reason, suspend or terminate this EULA with or without prior notice. This EULA will terminate immediately, without prior notice from Tiranve, in the event that you fail to comply with any provision of this EULA. You may also terminate this EULA by deleting the Application and all copies there of from your mobile device or from your desktop. Upon termination of this EULA, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your desktop.\n\nSeverability\n\nIf any provision of this EULA is held to be unenforceable or invalid, such provision will be\nchanged and interpreted to accomplish the objectives of such provision to the greatest extent\npossible under applicable law and the remaining provisions will continue in full force and effect.\n\nAmendments to this EULA\n\nTiranve reserves the right, at its sole discretion, to modify or replace this EULA at any time. If a revision is material we will provide at least 2 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."}</Text>
            </ScrollView>

            <View style = {Styles.footer} > 
              <View style = {Styles.agreebtn}>
                <Text onPress = { () => this.agreeTerms() } style = {{ borderTopWidth: 0, color:'#fff' }} > Agree </Text>
              </View>

              <View style = {Styles.cancelbtn}>
                <Text onPress = { () => this.cancelTerms() } style = {{ borderTopWidth: 0, }} > Cancel </Text>
              </View>
            </View>

          </View>


        </View>
    );
  }
  
}

export default Terms