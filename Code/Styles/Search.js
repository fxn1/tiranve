import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
import listStyles from 'Code/Styles/MemberList';

export default {
    ...listStyles,
    
    searchInput:{
        width:windowWidth*0.72,
        height:windowHeight*0.07
    },

    listView: {
        backgroundColor:StyleVars.Colors.lightBackground,
        paddingTop:windowHeight*0.04
    },

    lessThenThreeView: {
        justifyContent:'flex-start'
    },

    lessThenThreeItem:{
        marginHorizontal:windowWidth*0.040,
    }
};