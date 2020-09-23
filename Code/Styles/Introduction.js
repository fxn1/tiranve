import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions,StatusBar } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {
    customStatusBar: {
        backgroundColor:'#fff',
        width:windowWidth,
        height:StatusBar.currentHeight
    },

    customHeader:{
        backgroundColor:StyleVars.Colors.secondary,
        width:windowWidth,
        height:windowWidth*0.42,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:windowWidth*0.10,
    },

    titleView:{
        marginTop:windowWidth*0.20,
        fontSize:StyleVars.FontSize.appName,
        fontFamily:StyleVars.Fonts.bold,
        color:'#fff'
     },

     closeIcon:{
        marginTop:windowWidth*0.23,
        fontSize:StyleVars.FontSize.title,
        color:'#fff'
     },

     introductionText:{
        fontFamily:StyleVars.Fonts.regular,
        fontSize:StyleVars.FontSize.smallTextThird,
        marginHorizontal:windowWidth*0.10,
        marginTop:windowWidth*0.062,
     },

     introductionFooter:{
        fontFamily:StyleVars.Fonts.demiBold,
        fontSize:StyleVars.FontSize.smallTextThird,
        marginHorizontal:windowWidth*0.10,
        marginTop:windowWidth*0.062,
     }

};