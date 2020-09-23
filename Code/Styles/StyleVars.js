import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {
    Colors: {
        primary: "rgb(250, 250, 250)",
        primaryDark: "rgb(40, 60, 70)",
        secondary: "#18244d",
        primaryText:"#0c1227",
        navBarBackground: "#fff",
        navBarTitle: "white",
        lightBackground: "#f9f9f9",
        mediumBackground: "rgb(240, 240, 240)",
        darkBackground: "rgb(200, 200, 200)",
        appSecondary: "#2ab27b",
        appBackground: "#fff",
        fontColor: '#fff',
        tileColor:'#283c46',
        inputText:'rgb(40, 60, 70)',
        textColor:'#283c46',
        link:'#3097D1',
        subText:'#888888'
    },

    Fonts: {
        logo: "Arial",
        general: "Roboto",
        Medium:'AvenirNext-Medium',
        bold:'AvenirNext-Bold',
        regular:'AvenirNext-Regular',
        demiBold:'AvenirNext-DemiBold'
    },

    FontSize: {
        appName:windowWidth*0.10,
        title: windowWidth*0.075,
        subtitle:windowWidth*0.05,
        normal:windowWidth*0.05,
        smallText:windowWidth*0.0375,
        smallTextSecondary:windowWidth*0.0343,
        smallTextThird:windowWidth*0.0407,
        smallTextFourth:windowWidth*0.0625,
        
        inputText: 14,
        normalText: 15,
        headerText:20,
        tableheaderText:16,
    }
}