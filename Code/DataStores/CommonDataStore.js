'use strict';
import Reflux from 'reflux';

import AccessToken from 'Code/Classes/AccessToken';
import Actions from 'Code/Actions/CommonActions';
import ApiRequest from 'Code/ApiRequests/CommonApiRequest';
import AuthUser from 'Code/Classes/AuthUser';
import Helpers from 'Code/Classes/Helpers';


let currentUser = null;
let isConnected = true;

export default Reflux.createStore({
  listenables: Actions,
  init: function () {},

  getCurrentUser() {
    return currentUser;
  },
  setCurrentUser(uid, user) {
    currentUser = Object.assign({ uid: uid }, user);
  },

  onLogin: function (data) {
     ApiRequest.login(data)

      .then((authData) => {
        AccessToken.set(authData.token)
          .then(() => {
            Actions.login.completed(authData.user);
          })
      })
      .catch((err) => Actions.login.failed(err))
  },
  
  onLoginCompleted: function (userData) {
      AuthUser.set(userData);
      Actions.loadUser(userData);
  },

  onSignup: function (data) {
    ApiRequest.signup(data)
      .then((userData) => Actions.signup.completed(data, userData))
      .catch((err) => Actions.signup.failed(err));
  },

  onSignupCompleted: function (data, user) {
    Actions.login(data);
  },

  onLoadUser: function (userData) {
      Actions.loadUser.completed(userData.id, userData);
  },
  onLoadUserCompleted: function (uid, user) {
    this.setCurrentUser(uid, user);
  },
  
  onLogout: function (token) {
    AccessToken.clear();
    AuthUser.clear();
    ApiRequest.logout(token);
  },

  onSaveProfileImage: async function (imageData) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      ApiRequest.saveProfileImage(imageData, accessToken);
    } catch(err) {
      return false;
    }
  },

  onGetProfileImage: async function () {
    let accessToken = await AccessToken.get();

    if(!accessToken) {
        return false;
    }

    ApiRequest.getProfileImage(accessToken)
    .then( (imageData) => {
        Actions.getProfileImage.completed(imageData);
    });
  },

  onReportContent:async function(data) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.reportContent(accessToken, data);

      } catch(err) {
    }
  },

  onSendContact:async function(data) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.sendContact(accessToken, data);
      Actions.sendContact.completed(response);

      } catch(err) {
        Actions.sendContact.failed(err);
    }
  },


  onGetMemberList:async function() {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.getMemberList(accessToken);
      Actions.getMemberList.completed(response);

      } catch(err) {
        Actions.getMemberList.failed(err);
    }
  },

  onGetFilteredData:async function(searchString) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.getFilteredData(accessToken, searchString);
      Actions.getFilteredData.completed(response);

      } catch(err) {
        Actions.getFilteredData.failed(err);
    }
  },

  onGetMemberDetails:async function(memberID) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.getMemberDetails(accessToken, memberID);
      Actions.getMemberDetails.completed(response);

      } catch(err) {
        Actions.getMemberDetails.failed(err);
    }
  },

  onUpdateProfile:async function(data) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.updateProfile(accessToken, data);
      Actions.updateProfile.completed(response);

      } catch(err) {
        Actions.updateProfile.failed(err);
    }
  },

  onChangePassword:async function(newPassword) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.changePassword(accessToken, newPassword);
      Actions.changePassword.completed(response);

      } catch(err) {
        Actions.changePassword.failed(err);
    }
  },

  onForgotPassword:async function(email) {

    try {
      let response = await ApiRequest.forgotPassword(email);
      Actions.forgotPassword.completed(response);

      } catch(err) {
        Actions.forgotPassword.failed(err);
    }
  },

  onGetNextPofile:async function(memberID) {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      let response = await ApiRequest.getNextPofile(accessToken, memberID);
      Actions.getNextPofile.completed(response);

      } catch(err) {
        Actions.getNextPofile.failed(err);
    }
  },


  onActiveMobile:async function() {
    try {
      let accessToken = await AccessToken.get();
      if(!accessToken) {
          return false;
      }
      
      let response = await ApiRequest.activeMobile(accessToken);
      Actions.activeMobile.completed(response);

      } catch(err) {
        Actions.activeMobile.failed(err);
    }
  }





});
