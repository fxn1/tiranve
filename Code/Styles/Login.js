import StyleVars from 'Code/Styles/StyleVars';
import { StyleSheet, Platform, Dimensions } from 'react-native';
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;


export default {
    viewContainer : {
        marginTop: (windowHeight/4),
        marginBottom: (windowHeight/3),
        marginRight:15,
        marginLeft:15,
        borderRadius:10,
        padding:10,
        flex:0
    },

    subtext: {
        alignSelf:'center', 
        marginTop:windowHeight*0.009,
        textDecorationLine:'underline',
        color:StyleVars.Colors.subText,
        fontSize:StyleVars.FontSize.smallText,
        fontFamily:StyleVars.Fonts.regular
    },

    cardHeader: {
        fontFamily:StyleVars.Fonts.Medium,
        lineHeight:22
    }
};