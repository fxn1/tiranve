import Reflux from 'reflux';
import AccessToken from 'Code/Classes/AccessToken';

let authActions = Reflux.createActions([

  'auth',

  'unauth',

  {'login':{ 'asyncResult':true } },

  "logout",

  {'signup':{ 'asyncResult':true } },

  {'loadUser': {'asyncResult':true}},

  "changeProfilePicture",

  {'saveProfileImage' : {'asyncResult':true} },

  {'getProfileImage' : {'asyncResult':true} },

  {'sendContact' : {'asyncResult':true} },

  {'activeMobile' : {'asyncResult':true} },
  
  {'reportContent' : {'asyncResult':true} },

  {'getMemberList' : {'asyncResult':true} },

  {'getMemberDetails' : {'asyncResult':true} },

  {'getFilteredData' : {'asyncResult':true} },

  {'updateProfile' : {'asyncResult':true} },

  {'changePassword' : {'asyncResult':true} },

  {'forgotPassword' : {'asyncResult':true} },
  
  {'getNextPofile' : {'asyncResult':true} },

  {'activeMobile' : {'asyncResult':true} },






]);

authActions.auth.listen( function() {
  return AccessToken.get()
          .then((token) => authActions.login(token))
          .catch((err) => authActions.logout());
});

authActions.unauth.listen( function() {
  return AccessToken.clear();
});

export default authActions;