'use strict';
import { Navigator
} from 'react-native-deprecated-custom-components';
import HeaderLeftView from 'Code/Views/HeaderButtons/LeftView';
import HeaderRightView from 'Code/Views/HeaderButtons/RightView';
import Login from 'Code/Screens/Auth/Login';
import ForgotPassword from 'Code/Screens/Auth/ForgotPassword';
import MemberList from 'Code/Screens/Members/MemberList.js';
import MemberShow from 'Code/Screens/Members/MemberShow.js';
import MemberProfile from 'Code/Screens/Members/MemberProfile.js';
import Settings from 'Code/Screens/Auth/Settings.js';
import Search from 'Code/Screens/Members/Search.js';
import Eula from 'Code/Screens/Eula'
import Intoduction from 'Code/Screens/Introduction'
//import ShowImage from 'Code/Screens/Members/ShowImage'



class Routes {
  get(route, args) {
    
    if ("undefined" == typeof this[route]) {
      return false;
    } else {
      return this[route].call(this, args);
    }
  }

 login() {
    return {
      name: "login",
      title: "Tiranve",
      component: Login,
      hideNavigationBar: true,
      statusBarStyle: "dark-content"
    }
 }


 forgotPassword() {
  return {
    name: "forgot_password",
    title: "Tiranve",
    component: ForgotPassword,
    hideNavigationBar: true,
    statusBarStyle: "dark-content"
  }
}

memberList() {
  return {
    name: "member_list",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: MemberList,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}


memberShow() {
  return {
    name: "member_show",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: MemberShow,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}

memberProfile() {
  return {
    name: "member_profile",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: MemberProfile,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}

settings() {
  return {
    name: "settings",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: Settings,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}

search() {
  return {
    name: "search",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: Search,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}


terms() {
  return {
    name: "terms",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: Eula,
    hideNavigationBar: false,
    statusBarStyle: "dark-content"
  }
}

introduction() {

  return {
    name: "introduction",
    title: "",
    leftButton: HeaderLeftView,
    rightButton: HeaderRightView,
    component: Intoduction,
    hideNavigationBar: true,
    statusBarStyle: "dark-content",
    viewFlow: Navigator.SceneConfigs.VerticalDownSwipeJump
  }
}

// showImage() {
//   return {
//     name: "introduction",
//     title: "",
//     leftButton: HeaderLeftView,
//     rightButton: HeaderRightView,
//     component: ShowImage,
//     hideNavigationBar: true,
//     statusBarStyle: "dark-content"
//   }
// }


}

export default new Routes()
