import {
    StyleSheet,
    Dimensions
} from 'react-native';
import StyleVars from 'Code/Styles/StyleVars';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

export default {
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: StyleVars.Colors.mediumBackground
    },
    headingText: {
        color: StyleVars.Colors.primaryText,
        fontFamily: StyleVars.Fonts.heading,
        fontSize: 16,
        fontWeight: "600"
    },
    text: {
        color: StyleVars.Colors.primaryText,
        fontFamily: StyleVars.Fonts.general,
        fontSize: 12,
        fontWeight: "400"
    },
    navBarTitleText: {
        color: StyleVars.Colors.navBarTitle,
        fontFamily: StyleVars.Fonts.heading,
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 22
    },

    KeyboardAwareScrollView: {
        backgroundColor: StyleVars.Colors.appSecondary
    },

    rowNameText: {
        color: StyleVars.Colors.link,
        fontFamily: StyleVars.Fonts.general,
        fontSize: 18,
        fontWeight: "400"
    },

    statusBlue:{
        backgroundColor:'rgb(48, 151, 209)'
    },

    formTitle: {
        color:'#283C46',
        marginLeft:20, 
        marginVertical:10,
        paddingVertical:10,
        paddingTop:0
    },

    submitFormButton:{
        paddingVertical: windowHeight*.015,
        marginVertical:0,
        marginLeft:10
    },

    cancelFormButton:{
        borderColor:'rgb(204, 204, 204)',
        paddingVertical: windowHeight*.015,
        marginVertical:0,
        backgroundColor:'transparent',
        paddingRight:10
    },

    cancelFormButtonText:{
        fontSize:13, color:'#283c46'
    },

    submitFormButtonText:{
        fontSize:13,
    },

    mainTitle: {
        marginLeft: windowWidth*0.08,
        marginTop:windowHeight*0.02,
        color:StyleVars.Colors.textColor
    },


};