import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowWidthwindowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {
    container:{
        backgroundColor:StyleVars.Colors.lightBackground
    },

    changePasswordText:{
        color:StyleVars.Colors.secondary,
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.regular,
        marginLeft:windowWidth*0.0625,
        marginTop:windowWidth*0.0937,
    },

    changePasswordInput: {
        marginLeft:windowWidth*0.0625,
        marginRight:windowWidth*0.0625,
        width:windowWidth*0.85
    },

    changePasswordButton:{
        marginTop:windowWidth*0.09375
    },

    logoutButtonText:{
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.regular,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        color: '#D0021B',
        textAlign:'center',
        marginTop:windowWidth*0.0375
    },

    logoutButtonView:{
        position:'absolute',
        flex:1,
        left:0,
        right:0,
        bottom:windowWidth*0.333,
        height:windowWidth*0.14375,
        backgroundColor:'#fff'
    },

    contactUsText: {
        color:StyleVars.Colors.secondary,
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.demiBold,
        marginLeft:windowWidth*0.0625,
        marginTop:windowWidth*0.0937,
    },
    contactUsView: {
        marginBottom:20
    },
    contactUsViewItem:{
        flexDirection:'row',
        marginLeft:windowWidth*0.0625,
        marginTop:5,
    },
    contactUsViewItemHeading:{
        color:StyleVars.Colors.secondary,
        fontSize:StyleVars.FontSize.normal,
        fontFamily:StyleVars.Fonts.regular,
    },
    contactUsViewItemValue:{

    },

    errorView:{
        marginTop:10,
        marginLeft:windowWidth*0.0625,
        marginTop:windowWidth*0.0937,
    }
};